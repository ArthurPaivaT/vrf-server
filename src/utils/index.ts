import { BN } from "@project-serum/anchor";

function isPk(obj: any) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj["toBase58"] === "function"
  );
}

function parseType(v: any) {
  if (v === null || v === undefined) {
    return "null";
  }
  if (typeof v === "object") {
    if (v instanceof Array) {
      return "array";
    }
    if (v instanceof Date) {
      return "date";
    }
    return "object";
  }
  return typeof v;
}

function stringifyPKsAndBNs(i: any): any {
  if (isPk(i)) {
    return i.toBase58();
  } else if (i instanceof BN) {
    return i.toString();
  } else if (parseType(i) === "array") {
    return stringifyPKsAndBNInArray(i);
  } else if (parseType(i) === "object") {
    return stringifyPKsAndBNsInObject(i);
  }
  return i;
}

function stringifyPKsAndBNsInObject(o: any) {
  const newO = Object.assign({}, o);
  for (const [k, j] of Object.entries(newO)) {
    let v = j as any;

    if (isPk(v)) {
      newO[k] = v.toBase58();
    } else if (v instanceof BN) {
      newO[k] = v.toString();
    } else if (parseType(v) === "array") {
      newO[k] = stringifyPKsAndBNInArray(v);
    } else if (parseType(v) === "object") {
      newO[k] = stringifyPKsAndBNsInObject(v);
    } else {
      newO[k] = v;
    }
  }
  return newO;
}
function stringifyPKsAndBNInArray(a: any): any {
  const newA = [];
  for (const i of a) {
    if (isPk(i)) {
      newA.push(i.toBase58());
    } else if (i instanceof BN) {
      newA.push(i.toString());
    } else if (parseType(i) === "array") {
      newA.push(stringifyPKsAndBNInArray(i));
    } else if (parseType(i) === "object") {
      newA.push(stringifyPKsAndBNs(i));
    } else {
      newA.push(i);
    }
  }
  return newA;
}

export { stringifyPKsAndBNs };
