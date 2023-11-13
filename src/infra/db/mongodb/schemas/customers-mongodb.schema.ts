import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    document: { type: Number, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

schema.index({ document: 1 });
schema.index({ name: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

const CustomersSchema = mongoose.model('customers', schema, 'customers');

CustomersSchema.createIndexes().then((res) => res);

CustomersSchema.on('index', (e) => {
    if (e) console.log(e);
});

export { CustomersSchema };
