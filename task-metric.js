import { sparqlEscapeDateTime } from 'mu';
import { querySudo as query } from '@lblod/mu-auth-sudo';

export default class TaskMetric {
  static async calculateAll(since) {
    const results = await query(`
     select (count(?s) as ?count) ?creator ?status
     WHERE {
       ?s a <http://redpencil.data.gift/vocabularies/tasks/Task>.
       ?s <http://purl.org/dc/terms/creator> ?creator.
       ?s <http://www.w3.org/ns/adms#status> ?status.
       ?s <http://purl.org/dc/terms/modified> ?modified.
       ${ since ? `FILTER( ?modified >= ${sparqlEscapeDateTime(since)})` : ""}
     }
     group by ?creator ?status`
    );
    return results.results.bindings.map(TaskMetric.fromBinding);
  }

  static fromBinding({creator, status, count}) {
    return new TaskMetric({
      creator: creator?.value,
      status: status?.value,
      count: count.value ? parseInt(count.value) : null
    });
  }

  constructor({creator, status, count}) {
    this.creator = creator;
    this.status = status;
    this.count = count;
  }
}
