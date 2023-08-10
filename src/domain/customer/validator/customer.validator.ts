import * as yup from 'yup';
import { CustomerInterface, ValidatorInterface } from '@/domain/@shared/contracts';

export class CustomerYupValidator implements ValidatorInterface<CustomerInterface> {
    validate(entity: CustomerInterface): void {
        try {
            yup.object()
                .shape({
                    name: yup
                        .string()
                        .max(20, 'O nome não pode conter mais de 20 caracteres')
                        .required('O nome é requerido'),
                })
                .validateSync(
                    {
                        name: entity.name,
                    },
                    { abortEarly: false }
                );
        } catch (errors) {
            const e = errors as yup.ValidationError;

            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: 'product',
                    message: error,
                });
            });
        }
    }
}
