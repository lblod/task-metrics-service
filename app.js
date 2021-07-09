import { app, errorHandler } from 'mu';
import TaskMetric from './task-metric';

app.get('/metrics', async function( req, res ) {
  const oneHourAgo = new Date() - 3600;
  const metrics = await TaskMetric.calculateAll(oneHourAgo);
  const metric_strings = metrics.map((metric) => `mu_tasks_last_hour{status="${metric.status}", creator="${metric.creator}"} ${metric.count}`);
  res.contentType('text/plain');
  res.send(metric_strings.join("\n"));
} );

app.get('/metrics.json', async function( req, res ) {
  const oneHourAgo = new Date() - 3600;
  const metrics = await TaskMetric.calculateAll(oneHourAgo);
  // TODO: can probably use a better structure
  res.send(metrics);
} );
app.use(errorHandler);
