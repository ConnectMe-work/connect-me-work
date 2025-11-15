import { z } from "zod"
import zodToJsonSchema from 'zod-to-json-schema'

export interface PaginateResults<T> {
  list: T[];
  count: number;
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export enum OperationType {
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const paginateParams = z.object({
  skip: z.number(),
  take: z.number(),
  sort: z.nativeEnum(SortType),
  orderBy: z.string(),
  filter: z.string()
})

export type PaginateParams = z.infer<typeof paginateParams>;

export const datePaginationParams = z.object({
  startDateActive: z.date(),
  endDateActive: z.date()
})

export type DatePaginateParams = z.infer<typeof datePaginationParams>;

export const statusReponseObject = z.object({
  status: z.string(),
  id: z.number().optional()
})

export const statusReponseSchema = zodToJsonSchema(statusReponseObject)

export type StatusResponseStatusType = z.infer<typeof statusReponseObject>

export const note = z.object({
  noteId: z.number().optional(),
  note: z.string().optional(),
  editable: z.boolean().optional(),
  description: z.string().optional(),
  attribute1: z.string().optional(),
  attribute2: z.string().optional(),
  attribute3: z.string().optional(),
  attribute4: z.string().optional(),
  attribute5: z.string().optional(),
  attribute6: z.string().optional(),
  attribute7: z.string().optional(),
  attribute8: z.string().optional(),
  attribute9: z.string().optional(),
  attribute10: z.string().optional(),
  attribute11: z.string().optional(),
  attribute12: z.string().optional(),
  attribute13: z.string().optional(),
  attribute14: z.string().optional(),
  attribute15: z.string().optional(),
  createDate: z.date().optional()
})

export type NoteSchema = z.infer<typeof note>;

export const notes = z.object({
  count: z.number(),
  list: z.array(note)
})

export type NotesSchema = z.infer<typeof notes>;

export const map = z.object({
  mapId: z.number().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  partyId: z.number().optional(),
  createDate: z.date().optional()
})

export type MapSchema = z.infer<typeof map>;

export const maps = z.array(map)

export type MapsSchema = z.infer<typeof maps>;

export const attachment = z.object({
  attachmentId: z.number().optional(),
  editable: z.boolean().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
  description: z.string().optional(),
  attribute1: z.string().optional(),
  attribute2: z.string().optional(),
  attribute3: z.string().optional(),
  attribute4: z.string().optional(),
  attribute5: z.string().optional(),
  attribute6: z.string().optional(),
  attribute7: z.string().optional(),
  attribute8: z.string().optional(),
  attribute9: z.string().optional(),
  attribute10: z.string().optional(),
  attribute11: z.string().optional(),
  attribute12: z.string().optional(),
  attribute13: z.string().optional(),
  attribute14: z.string().optional(),
  attribute15: z.string().optional(),
  createDate: z.date().optional()
})

export type AttachmentSchema = z.infer<typeof attachment>;

export const attachments = z.object({
  count: z.number(),
  list: z.array(attachment)
})

export type AttachmentsSchema = z.infer<typeof attachments>;



export const chatId = z.object({
  chatId: z.number(),
})

export type ChatIdSchema = z.infer<typeof chatId>;

export const createExport = z.object({
  agentCode: z.string(),
  templateIdentifier: z.string(),
  payload: z.any(),
  footerText: z.string()
})

export type CreateExport = z.infer<typeof createExport>
