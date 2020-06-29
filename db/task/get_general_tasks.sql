select * from task
where user_id = ${id}
and done = false;