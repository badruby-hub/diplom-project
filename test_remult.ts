import { api } from '@/server/api';
import { Product } from './shared/entities/Product';

async function go() {


  const
    remult = await api.getRemult(),
    res = await remult.repo(Product).find({
      include: {
        category: true,
        sizeProduct: {
          include: {
            sizeName: true
          }
        }
      }
    });

  console.log(res);
}
go();
