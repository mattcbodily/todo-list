select p.project_id, p.project_name from project p
join user_project_join up on p.project_id = up.project_id
where up.user_id = ${id};