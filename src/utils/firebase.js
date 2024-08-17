import 'firebase/app'
import {initializeApp} from 'firebase/app'

import 'firebase/storage'
import {getStorage} from 'firebase/storage'

const firebaseConfig = initializeApp({
  "type": "service_account",
  "project_id": "cv-manager-2a87e",
  "private_key_id": "63e018d2b8b96dd81094d998881af8d6cd8f3f5b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCypwb5b/zr41Kc\nCTErPqlNkR7nm13cA8QdphVGO1ADcBd7Zygatt35a9mMRlR/5c6qXc+Sxh+aeb7m\nH1sMrnj2p3u6yHDB057QgosbIAktelG/wH/V8fu7yskcZHDbaxIlR3N0OKChYIUy\nVfv9zt8KnrXfjcsqR/TLkRFii9hxuXCzdONZjkWvxf2xBW7xSkTrFeAf2syka1MJ\ncKZlakhkuMz4QSOHXqbrhZcWsujRiHT8pDLkNocYU3LWY5UOjtImIZeMuiUaLiCY\npZoinV8yoBM4sEHrBBEao+jhcFfoTt97STvMz3xm3FNoT8H/Vc5bgw+VZEPXY/Mc\nnv7aDBQfAgMBAAECggEAAvAG5dTpFRBKFfSueLqIvp1GCeuC/ygffyCksz6S5hOS\nrJuw7ilj85yOJj9N8N0cnHslrszt7z0ZDOzq/+wVUhz4tW+FlhAx2pGrfMOYl03Q\nkQqlyRPZ/GOPNGsDUlOFSge0PkRKX54CuAO8q5bFANurCMuEUb3DW97Bj4ajFnPf\n9D0k4KQ7beDY4SMKsIE8v3Yx+z+HpoMOGY7GY/XH33dwZf2y7BvDMQ63NZvhjgah\nYsbBPvzTxoCS4uJPEyKVqkEiBw/7Y7iuW1RmTLSJ1kPrMBmO9zZaSJChLKnLDYXA\n9giEMTSkZQA9UilT3QL6N/tXXUoW6Dk+d0q/p3DCNQKBgQDeP2ix0/rfCd8FNV7Q\nwUmSi71pShnhHold/uy6X+VdtGNmm45Z3oDDL9X9XGWGBrx7M4TtIYTzTosjli37\npDoiCAkaITRbhVKtKzLb/0g7m4oYLsPdXNzK0dY9oM3q6MPeDh+KyZSUwHR2Xidh\nlXiCa2S78QKjliIWiyOK+gfPvQKBgQDNyLavRbnWOfQoPmlQWkIDOLFO9F9Ao0p8\n14B5TfkjT7E7a54d95K9/xA/Lke5jfIqDkP4RmTe7bieHz7Vj/o96As7BhVOsS5b\nE0geMHfoTYZZO97qZvXAsZI081M4YibOxDGIYIrf6UcrmYk1BrTFIDOj+AlNisr/\nhzlkjBmzCwKBgCxMiUrAzQV+CzUXkUGc9VQ/hE6jVYs4sfrJYFg52xcVaKbAJNym\n7BV7yHSK4TWYzCLmfv1hLAXvRu6d9aZt8qRr45yQt8XySit4K9gMB1LSSvFNCP9r\njhrjPofkMIc9RCVTvVfFnFcWEWCynbjmuTGNxHNts6/1se+6ZihCdCIlAoGAKfGV\nOthtbnrVhzZhZN1gwyNVEJDCsXwW/Kc4KoF4HHhr2X6v9c+2ez934kjembWS/Ht3\n4y0F9mJh1Ojtd74m9WNMlrVAto9qsWmWs4CRkCntDlcjsodV4/bNpDlMZxuqaU6Y\nAgIbjFQSC5L54nMBeYR8whkWXFXD1p2LVzEvM80CgYEAvTTvI2cX+D9chFbLSLxf\nWF8f1dQs7kDpxUGpzy7G++qTsWN5KRne69TYY/ovm9v4N4C4/BCTLLZiNgM3LaNU\ngKc2nezSM+7+4QFQDJcrO6+MTxJTKzWv3llbD1arhAjUYCeNsagoCxFMz3+riDzv\n6PEHgtCB1J9hcwNbfL5aemQ=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1jhye@cv-manager-2a87e.iam.gserviceaccount.com",
  "client_id": "102245148019548996675",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1jhye%40cv-manager-2a87e.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
  })
  
  const storage = getStorage(firebaseConfig);
  
  export default storage;