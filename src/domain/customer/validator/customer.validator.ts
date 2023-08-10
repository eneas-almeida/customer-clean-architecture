import * as yup from 'yup';
import { CustomerInterface, ValidatorInterface } from '@/domain/@shared/contracts';

export class CustomerYupValidator implements ValidatorInterface<CustomerInterface> {
    validate(entity: CustomerInterface): void {
        try {
            yup.object()
                .shape({
                    document: yup
                        .number()
                        .positive('O documento não pode ser negativo')
                        .required('O documento é requerido'),
                    name: yup
                        .string()
                        .max(20, 'O nome não pode conter mais de 20 caracteres')
                        .required('O nome é requerido'),
                })
                .validateSync(
                    {
                        document: entity.document,
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
