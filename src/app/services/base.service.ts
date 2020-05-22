import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends { id: string }> {
  private Db: Dexie;
  private table: Dexie.Table<T, any> = null;

  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    @Inject(String) private nomeTabela: string,
    @Inject(String) private urlApi: string
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);

    this.ouvirStatusConexao();
    this.iniciarIndexeDb();
  }

  private iniciarIndexeDb() {
    this.Db = new Dexie('db-seguros');
    this.Db.version(1).stores({
      [this.nomeTabela]: `id`,
    });
    this.table = this.Db.table(this.nomeTabela);
  }

  cadastrarApi(tabela: T) {
    this.http.post(this.urlApi, tabela).subscribe(
      () => alert(`${this.nomeTabela} cadastrado com Sucesso`),
      (err) => console.log(`Erro ao cadastrar ${this.nomeTabela}`, err)
    );
  }

  private async salvarIndexedDb(tabela: T) {
    try {
      await this.table.add(tabela);
      const todasTabelas: T[] = await this.table.toArray();

      console.log(`${this.nomeTabela} foi salvo no IndexedDB`, todasTabelas);
    } catch (error) {
      console.log(`Erro ao ADD ${this.nomeTabela} no IndexedDB`, error);
    }
  }

  private async enviarIndexedDbParaApi() {
    try {
      const todasTabelas: T[] = await this.table.toArray();
      for (const s of todasTabelas) {
        this.cadastrarApi(s);
        await this.table.delete(s.id);
        console.log(`${this.nomeTabela} com o ID ${s.id} foi excluido!`);
      }
    } catch (error) {
      console.log('Deu Ruim em adicionar dados do Indexdb para API!!!');
    }
  }
  cadastrar(tabela: T) {
    if (this.onlineOfflineService.IsOnline) {
      this.cadastrarApi(tabela);
    } else {
      this.salvarIndexedDb(tabela);
    }
  }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.urlApi);
  }

  private ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao.subscribe((online) => {
      if (online) {
        this.enviarIndexedDbParaApi();
        console.log('Enviado os dados do meu local para API');
      } else {
        console.log('Estou offline!!');
      }
    });
  }
}
