import bcrypt from 'bcrypt';

export const encryptPassword = async (pass: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    return hashedPassword;
};

export const comparePassword = async (
    pass: string,
    dbPassword: string
): Promise<boolean> => await bcrypt.compare(pass, dbPassword);