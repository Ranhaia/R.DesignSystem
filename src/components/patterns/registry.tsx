import type { ComponentType } from "react"

import { ConfirmationDialogPattern } from "@/components/patterns/confirmation-dialog"
import { CrudPattern } from "@/components/patterns/crud"
import { DeleteFlowPattern } from "@/components/patterns/delete-flow"
import { EmptyStatePattern } from "@/components/patterns/empty-state"
import { ErrorStatePattern } from "@/components/patterns/error-state"
import { FilterPanelPattern } from "@/components/patterns/filter-panel"
import { FiltersPattern } from "@/components/patterns/filters"
import { InfiniteScrollPattern } from "@/components/patterns/infinite-scroll"
import { LoadingPattern } from "@/components/patterns/loading"
import { MultiStepFormPattern } from "@/components/patterns/multi-step-form"
import { PaginationPattern } from "@/components/patterns/pagination"
import { SearchExperiencePattern } from "@/components/patterns/search-experience"
import { SkeletonPattern } from "@/components/patterns/skeleton"
import { SuccessFeedbackPattern } from "@/components/patterns/success-feedback"
import { ToastStrategyPattern } from "@/components/patterns/toast-strategy"
import { UploadPattern } from "@/components/patterns/upload"

export const patternRegistry: Record<string, ComponentType> = {
  "empty-state": EmptyStatePattern,
  loading: LoadingPattern,
  "error-state": ErrorStatePattern,
  skeleton: SkeletonPattern,
  "success-feedback": SuccessFeedbackPattern,
  "search-experience": SearchExperiencePattern,
  crud: CrudPattern,
  "multi-step-form": MultiStepFormPattern,
  "confirmation-dialog": ConfirmationDialogPattern,
  "delete-flow": DeleteFlowPattern,
  pagination: PaginationPattern,
  "infinite-scroll": InfiniteScrollPattern,
  filters: FiltersPattern,
  upload: UploadPattern,
  "toast-strategy": ToastStrategyPattern,
  "filter-panel": FilterPanelPattern,
}
