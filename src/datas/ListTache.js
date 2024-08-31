let listeTaches = [];

 listeTaches = fetch('http://localhost:8000/backend/api/get_task.php').then(listeTaches => listeTaches.json)


export { listeTaches };
