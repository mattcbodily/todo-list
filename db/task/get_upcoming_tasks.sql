select * from task
where user_id = ${id}
and complete_by > ${completeBy}
and done = false;