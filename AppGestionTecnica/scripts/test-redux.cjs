// Ejecuta los módulos TypeScript reales del store sin iniciar React Native.
// La comprobación completa de tipos se ejecuta por separado con npm run typecheck.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
global.__DEV__ = false;
const { createAppStore } = require('../src/store/store.ts');
const { addTask, updateTaskStatus } = require('../src/store/tasksSlice.ts');
const { login, logout } = require('../src/store/userSlice.ts');
const store = createAppStore();
const original = store.getState();
const user = { name: 'Usuario de prueba', email: 'demo@example.com', role: 'Técnico', shift: 'Mañana', area: 'Soporte' };
store.dispatch(login(user));
assert.deepEqual(store.getState().user.currentUser, user);
assert.strictEqual(store.getState().tasks, original.tasks);
const draft = { title: 'Prueba de pendiente', description: 'Validar flujo Redux', responsible: 'Usuario de prueba', contactPhone: '9999-1111', priority: 'Alta', status: 'Pendiente', shift: 'Mañana' };
store.dispatch(addTask(draft));
const first = store.getState().tasks.items[0];
store.dispatch(addTask(draft));
const second = store.getState().tasks.items[0];
assert.ok(first.id && first.createdAt);
assert.notEqual(first.id, second.id);
assert.equal(store.getState().tasks.items.length, original.tasks.items.length + 2);
assert.equal(original.tasks.items.length, 3, 'No se modifica el estado anterior');
assert.deepEqual(store.getState().user.currentUser, user);
for (const status of ['En proceso', 'Completado', 'Pendiente']) {
  store.dispatch(updateTaskStatus({ id: first.id, status }));
  assert.equal(store.getState().tasks.items.find(t => t.id === first.id).status, status);
  assert.strictEqual(store.getState().tasks.items.find(t => t.id === second.id), second);
}
const beforeUnknown = store.getState();
store.dispatch(updateTaskStatus({ id: 'no-existe', status: 'Completado' }));
assert.strictEqual(store.getState(), beforeUnknown);
const tasksBeforeLogout = store.getState().tasks;
store.dispatch(logout());
assert.equal(store.getState().user.currentUser, null);
assert.strictEqual(store.getState().tasks, tasksBeforeLogout, 'Cerrar sesión conserva los pendientes compartidos de la ejecución');
const logs = [];
const originalLog = console.log;
try {
  console.log = (...args) => logs.push(args);
  global.__DEV__ = true;
  store.dispatch(login(user));
} finally {
  console.log = originalLog;
  global.__DEV__ = false;
}
assert.equal(logs[0][1], 'user/login');
assert.equal(JSON.parse(logs[1][1]).user.currentUser, null);
assert.deepEqual(JSON.parse(logs[2][1]).user.currentUser, user);
assert.equal('password' in store.getState().user.currentUser, false);
assert.deepEqual(createAppStore().getState(), original, 'Una ejecución nueva empieza con los datos iniciales');
console.log('OK: sesión, altas con ID único, cambios de estado, ID inexistente, inmutabilidad, independencia de usuario y pendientes, cierre de sesión y registros de consola.');
