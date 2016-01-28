//throw new Error('new error!!');
function do_work() {
  throw new Error('unable to do work!');
};
try {
  do_work();
} catch(e) {
  console.log(e.message);
} finally {
    console.log('Block Executed');
}
console.log("Code Executed");
