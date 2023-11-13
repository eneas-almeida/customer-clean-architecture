import * as yup from 'yup';
import { NotificationError } from '@/domain/@shared/errors';
import { CustomersEntityInterface, ValidatorInterface } from '@/domain/@shared/contracts';

export class CustomersYupValidator implements ValidatorInterface<CustomersEntityInterface> {
    validate(entity: CustomersEntityInterface): void {
        try {
            yup.object()
                .shape({
                    document: yup
                        .number()
                        .positive('propriedade document não pode ser negativa')
                        .required('propriedade document requerida'),
                    name: yup
                        .string()
                        .min(3, 'propriedade nome deve conter no mínimo 3 caracteres')
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
        } catch (e) {
            const yupErrors = e as yup.ValidationError;

            yupErrors.errors.forEach((error) => {
                entity.notification.addError({ context: 'customer', message: error });
            });

            if (yupErrors.errors.length) {
                throw new NotificationError(400, entity.notification.getErrors());
            }
        }
    }
}
