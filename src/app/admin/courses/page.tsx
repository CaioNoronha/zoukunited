"use client"

import * as React from "react"
import {
  createCourse,
  createCourseModule,
  deleteCourse,
  deleteCourseModule,
  fetchCourseModules,
  fetchCourses,
  updateCourse,
  updateCourseBanner,
  updateCourseModule,
  updateCourseModuleOrder,
  removeCourseBanner,
  type Course,
  type CourseModule,
} from "@/services/courses"
import {
  ArrowRight,
  Check,
  Circle,
  CircleDot,
  ChevronDown,
  ChevronUp,
  Film,
  Loader2,
  Lock,
  Layers,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ModuleDraft = {
  title: string
  notes: string
  videoFile: File | null
}

type CourseForm = {
  title: string
  description: string
}

const initialCourseForm: CourseForm = { title: "", description: "" }

export default function AdminCoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([])
  const [loading, setLoading] = React.useState(true)

  const [courseDialogOpen, setCourseDialogOpen] = React.useState(false)
  const [courseStep, setCourseStep] = React.useState<1 | 2>(1)
  const [courseForm, setCourseForm] = React.useState<CourseForm>(initialCourseForm)
  const [courseModuleDrafts, setCourseModuleDrafts] = React.useState<ModuleDraft[]>([])
  const [creatingCourse, setCreatingCourse] = React.useState(false)
  const [titleTouched, setTitleTouched] = React.useState(false)
  const [advancingStep, setAdvancingStep] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null)
  const [editingCourseOpen, setEditingCourseOpen] = React.useState(false)

  const refreshCourses = React.useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchCourses()
      setCourses(data)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    refreshCourses().catch((error) => {
      console.error("Erro ao carregar cursos", error)
    })
  }, [refreshCourses])

  const resetCourseDialog = () => {
    setCourseForm(initialCourseForm)
    setCourseModuleDrafts([])
    setCourseStep(1)
    setTitleTouched(false)
    setAdvancingStep(false)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setCourseDialogOpen(open)
    if (!open) {
      resetCourseDialog()
    }
  }

  const handleNextStep = () => {
    const isValid = Boolean(courseForm.title.trim())
    setTitleTouched(true)
    if (!isValid) return
    setAdvancingStep(true)
    setCourseStep(2)
    window.setTimeout(() => setAdvancingStep(false), 250)
  }

  const handleAddCourseModuleDraft = () => {
    setCourseModuleDrafts((prev) => [
      ...prev,
      { title: "", notes: "", videoFile: null },
    ])
  }

  const handleUpdateCourseModuleDraft = (
    index: number,
    update: Partial<ModuleDraft>
  ) => {
    setCourseModuleDrafts((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...update } : item))
    )
  }

  const handleRemoveCourseModuleDraft = (index: number) => {
    setCourseModuleDrafts((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleCreateCourse = async () => {
    if (!courseForm.title.trim()) return
    setCreatingCourse(true)
    try {
      const courseId = await createCourse({
        title: courseForm.title.trim(),
        description: courseForm.description.trim(),
      })

      for (const draft of courseModuleDrafts) {
        if (!draft.title.trim()) continue
        await createCourseModule({
          courseId,
          title: draft.title.trim(),
          notes: draft.notes.trim(),
          videoFile: draft.videoFile,
        })
      }

      await refreshCourses()
      setCourseDialogOpen(false)
      resetCourseDialog()
    } catch (error) {
      console.error("Erro ao criar curso", error)
    } finally {
      setCreatingCourse(false)
    }
  }

  const handleOpenCourseDialog = (courseId: string) => {
    setSelectedCourseId(courseId)
    setEditingCourseOpen(true)
  }

  const handleCourseDialogOpenChange = (open: boolean) => {
    setEditingCourseOpen(open)
    if (!open) {
      setSelectedCourseId(null)
    }
  }

  const titleError = titleTouched && !courseForm.title.trim()
  const descriptionLimit = 300
  const descriptionCount = courseForm.description.length
  const visibleCourses = courses.filter((course) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true
    return (
      course.title.toLowerCase().includes(query) ||
      (course.description || "").toLowerCase().includes(query)
    )
  })
  const selectedCourse = courses.find((course) => course.id === selectedCourseId) || null

  return (
    <div className="w-full px-8 pb-16 pt-10 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Cursos</h1>
          <p className="text-sm text-white/60">
            Crie cursos e organize módulos com vídeos e notas.
          </p>
        </div>
        <button
          onClick={() => setCourseDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357]"
        >
          <Plus className="size-4" />
          Novo curso
        </button>
      </div>

      <Dialog open={courseDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-2xl rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl">Criar curso</DialogTitle>
            <DialogDescription className="text-white/60">
              {courseStep === 1
                ? "Preencha as informações principais do curso."
                : "Adicione módulos com vídeo e notas."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-center text-sm">
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 ${
                    courseStep === 1
                      ? "bg-[#f29b0f] text-black"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {courseStep === 1 ? (
                    <CircleDot className="size-4" />
                  ) : (
                    <Check className="size-4" />
                  )}
                  <span className="font-semibold">Curso</span>
                </span>
                <span className="text-white/40">→</span>
                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 ${
                    courseStep === 2
                      ? "bg-[#f29b0f] text-black"
                      : "bg-white/10 text-white/70"
                    }`}
                >
                  {courseStep === 2 ? (
                    <CircleDot className="size-4" />
                  ) : (
                    <Circle className="size-4" />
                  )}
                  <span className="font-semibold">Módulos</span>
                </span>
              </div>
            </div>
            <div className="h-1 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#f29b0f] transition-all"
                style={{ width: courseStep === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {courseStep === 1 ? (
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Título</label>
                <input
                  value={courseForm.title}
                  onChange={(event) =>
                    setCourseForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  onBlur={() => setTitleTouched(true)}
                  className="h-12 w-full rounded-md border border-white/15 bg-black/60 px-3 text-base text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
                  placeholder="Ex.: Musicalidade no Zouk"
                  aria-invalid={titleError}
                />
                <p className="text-xs text-white/50">
                  Exemplos: “Musicalidade para Social”, “Base & Conexão”, “Zouk do Zero”.
                </p>
                {titleError && (
                  <p className="text-xs text-[#ffb357]">Título é obrigatório.</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Descrição</label>
                <textarea
                  value={courseForm.description}
                  onChange={(event) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      description: event.target.value.slice(0, descriptionLimit),
                    }))
                  }
                  className="min-h-[140px] w-full rounded-md border border-white/15 bg-black/60 px-3 py-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
                  placeholder="Explique o que o aluno vai aprender e para quem é o curso."
                />
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>2–3 frases são suficientes. Inclua nível e objetivo do curso.</span>
                  <span>
                    {descriptionCount}/{descriptionLimit}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCourseDialogOpen(false)}
                  className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/60 transition hover:border-white/40 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!courseForm.title.trim() || advancingStep}
                  className="inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] hover:shadow-[0_0_18px_rgba(242,155,15,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {advancingStep ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowRight className="size-4" />
                  )}
                  Próximo
                </button>
                </div>
                <p className="text-xs text-white/50">
                  Próximo: você irá criar os módulos e adicionar vídeos.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="space-y-3">
                {courseModuleDrafts.length === 0 ? (
                  <p className="text-sm text-white/60">
                    Adicione módulos agora ou deixe para depois.
                  </p>
                ) : (
                  courseModuleDrafts.map((module, index) => (
                    <div
                      key={`draft-${index}`}
                      className="rounded-xl border border-white/10 bg-black/50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Módulo {index + 1}</p>
                        <button
                          onClick={() => handleRemoveCourseModuleDraft(index)}
                          className="text-xs text-white/60 hover:text-red-300"
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-3 grid gap-3">
                        <input
                          value={module.title}
                          onChange={(event) =>
                            handleUpdateCourseModuleDraft(index, {
                              title: event.target.value,
                            })
                          }
                          className="h-10 w-full rounded-md border border-white/10 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                          placeholder="Título do módulo"
                        />
                        <textarea
                          value={module.notes}
                          onChange={(event) =>
                            handleUpdateCourseModuleDraft(index, {
                              notes: event.target.value,
                            })
                          }
                          className="min-h-[120px] w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                          placeholder="Notas do módulo"
                        />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) =>
                            handleUpdateCourseModuleDraft(index, {
                              videoFile: event.target.files?.[0] || null,
                            })
                          }
                          className="text-sm text-white/70"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={handleAddCourseModuleDraft}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-[#f29b0f] hover:text-white"
              >
                <Plus className="size-4" />
                Adicionar módulo
              </button>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setCourseStep(1)}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-[#f29b0f] hover:text-white"
                >
                  Voltar
                </button>
                <button
                  onClick={handleCreateCourse}
                  disabled={creatingCourse}
                  className="inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {creatingCourse ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                  Criar curso
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CourseDialog
        open={editingCourseOpen}
        onOpenChange={handleCourseDialogOpenChange}
        course={selectedCourse}
        onSaved={refreshCourses}
        onDeleted={refreshCourses}
      />

      <div className="mt-8 space-y-4">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar cursos..."
            className="h-11 w-full rounded-md border border-white/10 bg-black/50 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
          />
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-white/70">
            <Loader2 className="size-4 animate-spin" />
            Carregando cursos...
          </div>
        ) : visibleCourses.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-white/70">
            Nenhum curso encontrado.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => {
              const moduleCount = 0
              const videoCount = 0

              return (
                <div
                  key={course.id}
                  className="group min-h-[280px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-[#f29b0f]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f29b0f]/40"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handleOpenCourseDialog(course.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      handleOpenCourseDialog(course.id)
                    }
                  }}
                >
                  <div
                    className="relative h-32 w-full bg-gradient-to-br from-[#111] via-[#0f0f0f] to-[#241a08] bg-cover bg-center"
                    style={
                      course.bannerUrl
                        ? { backgroundImage: `url(${course.bannerUrl})` }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
                    {!course.bannerUrl && (
                      <div className="absolute inset-0 flex items-center justify-center text-white/70">
                        <Lock className="size-5 text-[#f29b0f]/70" />
                        <span className="ml-2 text-sm">Zouk United</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      {course.description && (
                        <p className="line-clamp-1 text-sm text-white/60">
                          {course.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/55">
                        <span className="flex items-center gap-2">
                          <Layers className="size-3.5 text-[#f29b0f]" />
                          {moduleCount} módulos
                        </span>
                        <span className="flex items-center gap-2">
                          <Film className="size-3.5 text-[#f29b0f]" />
                          {videoCount} vídeos
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Clique para editar</span>
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleOpenCourseDialog(course.id)
                        }}
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-[#f29b0f] hover:text-white"
                      >
                        <Pencil className="size-3" />
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

type CourseDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
  onSaved: () => void | Promise<void>
  onDeleted: () => void | Promise<void>
}

function CourseDialog({ open, onOpenChange, course, onSaved, onDeleted }: CourseDialogProps) {
  const [draftTitle, setDraftTitle] = React.useState("")
  const [draftDescription, setDraftDescription] = React.useState("")
  const [titleTouched, setTitleTouched] = React.useState(false)
  const [bannerPreview, setBannerPreview] = React.useState<string | null>(null)
  const [bannerFile, setBannerFile] = React.useState<File | null>(null)
  const [removeBanner, setRemoveBanner] = React.useState(false)
  const [savingCourse, setSavingCourse] = React.useState(false)
  const [deletingCourse, setDeletingCourse] = React.useState(false)

  const [modules, setModules] = React.useState<CourseModule[]>([])
  const [modulesLoading, setModulesLoading] = React.useState(false)

  const [moduleEditorOpen, setModuleEditorOpen] = React.useState(false)
  const [activeModule, setActiveModule] = React.useState<CourseModule | null>(null)
  const [creatingModule, setCreatingModule] = React.useState(false)
  const [moduleSaving, setModuleSaving] = React.useState(false)
  const [moduleDeleting, setModuleDeleting] = React.useState(false)

  const descriptionLimit = 300
  const descriptionCount = draftDescription.length
  const titleError = titleTouched && !draftTitle.trim()

  React.useEffect(() => {
    if (!open || !course) return
    setDraftTitle(course.title)
    setDraftDescription(course.description || "")
    setTitleTouched(false)
    setBannerPreview(course.bannerUrl || null)
    setBannerFile(null)
    setRemoveBanner(false)
  }, [open, course])

  const refreshModules = React.useCallback(async () => {
    if (!course?.id) return
    setModulesLoading(true)
    try {
      const data = await fetchCourseModules(course.id)
      setModules(data)
    } catch (error) {
      console.error("Erro ao carregar módulos", error)
      setModules([])
    } finally {
      setModulesLoading(false)
    }
  }, [course?.id])

  React.useEffect(() => {
    if (!open || !course?.id) return
    void refreshModules()
  }, [open, course?.id, refreshModules])

  const handleClose = () => {
    if (!savingCourse) {
      onOpenChange(false)
    }
  }

  const handleSaveCourse = async () => {
    if (!course?.id) return
    setTitleTouched(true)
    if (!draftTitle.trim()) return
    setSavingCourse(true)
    try {
      await updateCourse(course.id, {
        title: draftTitle.trim(),
        description: draftDescription.trim(),
      })
      if (bannerFile) {
        await updateCourseBanner({
          courseId: course.id,
          file: bannerFile,
          previousBannerPath: course.bannerPath || null,
        })
      } else if (removeBanner && course.bannerPath) {
        await removeCourseBanner({
          courseId: course.id,
          bannerPath: course.bannerPath,
        })
      }
      await onSaved()
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao salvar curso", error)
    } finally {
      setSavingCourse(false)
    }
  }

  const handleDeleteCourse = async () => {
    if (!course?.id) return
    if (!window.confirm("Essa ação não pode ser desfeita. Deseja apagar o curso?")) {
      return
    }
    setDeletingCourse(true)
    try {
      await deleteCourse(course.id)
      await onDeleted()
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao apagar curso", error)
    } finally {
      setDeletingCourse(false)
    }
  }

  const handleOpenModuleEditor = (module?: CourseModule) => {
    setActiveModule(module || null)
    setCreatingModule(!module)
    setModuleEditorOpen(true)
  }

  const handleModuleEditorOpenChange = (nextOpen: boolean) => {
    setModuleEditorOpen(nextOpen)
    if (!nextOpen) {
      setActiveModule(null)
      setCreatingModule(false)
    }
  }

  const handleModuleSaved = async () => {
    await refreshModules()
  }

  const handleModuleDeleted = async () => {
    await refreshModules()
  }

  const handleMoveModule = async (index: number, direction: "up" | "down") => {
    if (!course?.id) return
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= modules.length) return

    const next = [...modules]
    const current = next[index]
    const target = next[targetIndex]
    next[index] = target
    next[targetIndex] = current
    setModules(
      next.map((item, idx) => ({
        ...item,
        order: idx,
      }))
    )

    try {
      await Promise.all(
        next.map((module, idx) =>
          updateCourseModuleOrder({
            courseId: course.id,
            moduleId: module.id,
            order: idx,
          })
        )
      )
    } catch (error) {
      console.error("Erro ao reordenar módulo", error)
    }
  }

  if (!course) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          <div className="flex items-center gap-2 text-white/60">
            <Loader2 className="size-4 animate-spin" />
            Carregando curso...
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">
                {draftTitle || course.title}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Gerencie detalhes do curso e módulos.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCourse}
                disabled={savingCourse}
                className="inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingCourse ? <Loader2 className="size-4 animate-spin" /> : <Pencil className="size-4" />}
                Salvar
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/60">
            Privado
          </span>
          <span className="flex items-center gap-2">
            <Layers className="size-3.5 text-[#f29b0f]" />
            {modules.length} módulos
          </span>
          <span className="flex items-center gap-2">
            <Film className="size-3.5 text-[#f29b0f]" />
            {modules.filter((module) => module.videoUrl).length} vídeos
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <CourseBannerUploader
            previewUrl={bannerPreview}
            onFileChange={(file, preview) => {
              setBannerFile(file)
              setBannerPreview(preview)
              setRemoveBanner(false)
            }}
            onClear={() => {
              setBannerFile(null)
              setBannerPreview(null)
              setRemoveBanner(true)
            }}
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Título</label>
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              onBlur={() => setTitleTouched(true)}
              className="h-12 w-full rounded-md border border-white/15 bg-black/60 px-3 text-base text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
              aria-invalid={titleError}
            />
            {titleError && (
              <p className="text-xs text-[#ffb357]">Título é obrigatório.</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Descrição</label>
            <textarea
              value={draftDescription}
              onChange={(event) =>
                setDraftDescription(event.target.value.slice(0, descriptionLimit))
              }
              className="min-h-[160px] w-full rounded-md border border-white/15 bg-black/60 px-3 py-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
              placeholder="Explique o que o aluno vai aprender e para quem é o curso."
            />
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>2–3 frases são suficientes. Inclua nível e objetivo.</span>
              <span>
                {descriptionCount}/{descriptionLimit}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <ModuleList
            modules={modules}
            loading={modulesLoading}
            onAdd={() => handleOpenModuleEditor()}
            onEdit={(module) => handleOpenModuleEditor(module)}
            onMove={handleMoveModule}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/10 pt-6">
          <div className="text-xs text-white/50">
            Essa ação não pode ser desfeita.
          </div>
          <button
            onClick={handleDeleteCourse}
            disabled={deletingCourse}
            className="inline-flex items-center gap-2 rounded-md border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:border-red-300 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingCourse ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Excluir curso
          </button>
        </div>

        <ModuleEditor
          open={moduleEditorOpen}
          onOpenChange={handleModuleEditorOpenChange}
          courseId={course.id}
          module={activeModule}
          isNew={creatingModule}
          onSaved={handleModuleSaved}
          onDeleted={handleModuleDeleted}
          setSaving={setModuleSaving}
          saving={moduleSaving}
          deleting={moduleDeleting}
          setDeleting={setModuleDeleting}
        />
      </DialogContent>
    </Dialog>
  )
}

type CourseBannerUploaderProps = {
  previewUrl: string | null
  onFileChange: (file: File | null, preview: string | null) => void
  onClear: () => void
}

function CourseBannerUploader({
  previewUrl,
  onFileChange,
  onClear,
}: CourseBannerUploaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (!file) {
      onFileChange(null, previewUrl)
      return
    }
    const nextPreview = URL.createObjectURL(file)
    onFileChange(file, nextPreview)
  }

  React.useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-white/80">Banner do curso</label>
        {previewUrl && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white"
          >
            <X className="size-3" />
            Remover
          </button>
        )}
      </div>
      <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111] via-[#0f0f0f] to-[#241a08]">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview do banner" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-white/60">
            <Lock className="size-5 text-[#f29b0f]/70" />
            <span className="ml-2 text-sm">Zouk United</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-[#f29b0f] hover:text-white"
        >
          <Upload className="size-3.5" />
          Trocar banner
        </button>
        <p className="text-xs text-white/50">Recomendado: 1600x900</p>
      </div>
    </div>
  )
}

type ModuleListProps = {
  modules: CourseModule[]
  loading: boolean
  onAdd: () => void
  onEdit: (module: CourseModule) => void
  onMove: (index: number, direction: "up" | "down") => void
}

function ModuleList({ modules, loading, onAdd, onEdit, onMove }: ModuleListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-semibold">Módulos do curso</h4>
          <p className="text-xs text-white/50">
            Clique para editar ou reordene com as setas.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-[#f29b0f] hover:text-white"
        >
          <Plus className="size-4" />
          Novo módulo
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="size-4 animate-spin" />
          Carregando módulos...
        </div>
      ) : modules.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/60">
          Nenhum módulo cadastrado ainda.
        </div>
      ) : (
        <div className="space-y-2">
          {modules.map((module, index) => (
            <div
              key={module.id}
              role="button"
              tabIndex={0}
              onClick={() => onEdit(module)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onEdit(module)
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-white/80 transition hover:border-[#f29b0f]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f29b0f]/40"
            >
              <span className="line-clamp-1">
                {index + 1}. {module.title}
              </span>
              <div className="flex items-center gap-2 text-white/50">
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    onMove(index, "up")
                  }}
                  className="rounded-md border border-white/10 p-1 transition hover:border-[#f29b0f]/50"
                  aria-label="Mover módulo para cima"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    onMove(index, "down")
                  }}
                  className="rounded-md border border-white/10 p-1 transition hover:border-[#f29b0f]/50"
                  aria-label="Mover módulo para baixo"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type ModuleEditorProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseId: string
  module: CourseModule | null
  isNew: boolean
  onSaved: () => void
  onDeleted: () => void
  saving: boolean
  deleting: boolean
  setSaving: (value: boolean) => void
  setDeleting: (value: boolean) => void
}

function ModuleEditor({
  open,
  onOpenChange,
  courseId,
  module,
  isNew,
  onSaved,
  onDeleted,
  saving,
  deleting,
  setSaving,
  setDeleting,
}: ModuleEditorProps) {
  const [title, setTitle] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [videoFile, setVideoFile] = React.useState<File | null>(null)
  const [touched, setTouched] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    setTitle(module?.title || "")
    setNotes(module?.notes || "")
    setVideoFile(null)
    setTouched(false)
  }, [open, module])

  const handleSave = async () => {
    setTouched(true)
    if (!title.trim()) return
    setSaving(true)
    try {
      if (isNew) {
        await createCourseModule({
          courseId,
          title: title.trim(),
          notes: notes.trim(),
          videoFile,
        })
        onSaved()
      } else if (module) {
        await updateCourseModule({
          courseId,
          moduleId: module.id,
          title: title.trim(),
          notes: notes.trim(),
          videoFile,
          previousVideoPath: module.videoPath || null,
        })
        onSaved()
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao salvar módulo", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!module) return
    if (!window.confirm("Essa ação não pode ser desfeita. Deseja apagar o módulo?")) {
      return
    }
    setDeleting(true)
    try {
      await deleteCourseModule({
        courseId,
        moduleId: module.id,
        videoPath: module.videoPath || null,
      })
      onDeleted()
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao apagar módulo", error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">
            {isNew ? "Novo módulo" : "Editar módulo"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Ajuste título, notas e vídeo.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Título</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => setTouched(true)}
              className="h-11 w-full rounded-md border border-white/15 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
              aria-invalid={touched && !title.trim()}
            />
            {touched && !title.trim() && (
              <p className="text-xs text-[#ffb357]">Título é obrigatório.</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Notas</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[140px] w-full rounded-md border border-white/15 bg-black/60 px-3 py-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/80 focus:ring-2 focus:ring-[#f29b0f]/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Vídeo</label>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
              className="text-sm text-white/60"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-md border border-red-400/40 px-3 py-2 text-xs font-semibold text-red-300 transition hover:border-red-300 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
              Apagar módulo
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Pencil className="size-4" />}
              Salvar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
