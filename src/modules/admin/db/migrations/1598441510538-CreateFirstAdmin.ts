import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { AdminEntity } from '../../model/admin.entity';
import * as bcrypt from 'bcrypt';

export class CreateFirstAdmin1598441510538 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<AdminEntity> = queryRunner.connection.getRepository(AdminEntity);

    if (await adminRepository.findOne({ where: { login: 'admin' } })) {
      return;
    }
    const admin: AdminEntity = adminRepository.create({
      login: 'admin',
      passwordHash: await bcrypt.hash('secret', 10),
      nickName: 'Tiger',
    });
    await adminRepository.insert(admin);
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<AdminEntity> = queryRunner.connection.getRepository(AdminEntity);
    const admin: AdminEntity = await adminRepository.findOne({ where: { login: 'admin' } })
    if (!admin) {
      return;
    }
    await adminRepository.remove(admin)
  }

}
