import jwt from 'jsonwebtoken';

const privateKey = process.env.JWT_SECRET;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey as string, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey as string);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    console.log(error);
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
}
