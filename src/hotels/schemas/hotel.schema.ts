import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true, versionKey: false })
export class Hotel {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;
    
    @Prop({ required: true })
    public createdAt: Date;

    @Prop({ required: true })
    public updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
