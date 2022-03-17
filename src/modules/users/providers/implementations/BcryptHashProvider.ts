import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '@modules/users/providers/models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return await hash(payload, 8);
	}

	public async compareHash(
		payload: string,
		hashed: string,
	): Promise<boolean> {
		return await compare(payload, hashed);
	}
}

export { BcryptHashProvider };
