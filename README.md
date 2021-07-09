# task-metric-service
A common pattern in semantic works is to work with tasks. This is a very simple service that provides metrics on tasks to ingest in prometheus.

Tasks should conform to the following shape:
```
       :task a <http://redpencil.data.gift/vocabularies/tasks/Task>.
       :task <http://purl.org/dc/terms/creator> ?creator.
       :task <http://www.w3.org/ns/adms#status> ?status.
       :task <http://purl.org/dc/terms/modified> ?modified.
```

## installation
simply include the following snippet in your docker-compose
```
  taskmetrics:
    image: lblod/task-metrics-service
    links:
      - database:database
```

expose the `/metrics` endpoint (available on port 80) via the [dispatcher](https://github.com/mu-semtech/mu-dispatcher) or directly via a port mapping.
