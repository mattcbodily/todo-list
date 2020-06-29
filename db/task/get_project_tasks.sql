select * from task
where project_id = ${id}
and done = false;