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

const CustomerSchema = mongoose.model('customer', schema, 'customers');

CustomerSchema.createIndexes().then((res) => res);

CustomerSchema.on('index', (e) => {
    if (e) console.log(e);
});

export { CustomerSchema };
