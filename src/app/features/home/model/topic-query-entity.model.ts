import { Pageable } from "./pageable.model";

export interface TopicQueryEntity {
  category?: number,
  search?: string,
  mine?: boolean,
  moreLiked?: boolean,
  page?: number,
  size?: number,
  sort?: string[]
}
