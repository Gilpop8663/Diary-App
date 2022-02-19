export interface feelingSchemaProps {
  name: string;
  properties: {
    _id: number;
    emotion: string;
    message: string;
  };
  primaryKey: number;
}
