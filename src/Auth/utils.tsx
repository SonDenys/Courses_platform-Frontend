import { ALGORITHMS, ISSUER } from "../params";

const jrsa = require('jsrsasign');

const { KEYUTIL, KJUR } = jrsa;

export function getKeyObject(public_key){
    return KEYUTIL.getKey(public_key);
}

export function checkJWT(token: string, public_key: any, algorithms: string[] = ALGORITHMS, issuer:string[] = ISSUER) {
    let xpkey;

    if (typeof public_key === 'string') {
        xpkey = getKeyObject(public_key);
    } else {
        xpkey = public_key;
    }

    const isValid = KJUR.jws.JWS.verifyJWT(token, xpkey, {
        alg: algorithms,
        iss: issuer,
        verifyAt: KJUR.jws.IntDate.getNow(),
    });

    if (isValid === false) {
        throw new Error('Invalid token');
    }

    const [_header, _metadata, _signature] = token.split('.');
    const payload = KJUR.jws.JWS.readSafeJSONString(jrsa.b64utoutf8(_metadata));
    return payload
}
