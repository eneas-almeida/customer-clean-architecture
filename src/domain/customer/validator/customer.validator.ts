import * as yup from 'yup';
import { CustomerInterface, ValidatorInterface } from '@/domain/@shared/contracts';

export class CustomerYupValidator implements ValidatorInterface<CustomerInterface> {
    validate(entity: CustomerInterface): void {
        try {
            yup.object()
                .shape({
                    document: yup
                        .number()
                        .positive('propriedade document não pode ser negativa')
                        .required('propriedade document requerida'),
                    name: yup
                        .string()
                        .max(20, 'propiedade nome não pode conter mais de 20 caracteres')
                        .required('propridade name requerida'),
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
                    context: 'customer',
                    message: error,
                });
            });
        }
    }
}
