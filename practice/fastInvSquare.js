const m = 0x5F375A86,
  // Creating the buffer and view outside the function
  // for performance, but this is not thread safe.
  buffer = new ArrayBuffer(4),
  view = new DataView(buffer)
function fastInvSqrt (n) {
  var f, n2 = n * 0.5, th = 1.5
  view.setFloat32(0, n)
  view.setUint32(0, m - (view.getUint32(0) >> 1))
  f = view.getFloat32(0)
  f *= (th - (n2 * f * f))
  f *= (th - (n2 * f * f))
  return f
}

const bytes = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT);
const floatView = new Float32Array(bytes);
const intView = new Uint32Array(bytes);
const threehalfs = 1.5;

function Q_rsqrt(number) {
  const x2 = number * 0.5;
  floatView[0] = number;
  intView[0] = 0x5f3759df - ( intView[0] >> 1 );
  let y = floatView[0];
  y = y * ( threehalfs - ( x2 * y * y ) );

  return y;
}


console.time('method1')
    console.log(fastInvSqrt(20))
console.timeEnd('method1')


console.time('method2')
    console.log(Q_rsqrt(20))
console.timeEnd('method2')


console.time('method3')
    console.log(Math.sqrt(20)**-1)
console.timeEnd('method3')