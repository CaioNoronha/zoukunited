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
  updateCourseModule,
  type Course,
  type CourseModule,
} from "@/services/courses"
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react"

type ModuleDraft = {
  title: string
  notes: string
  videoFile: File | null
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([])
  const [loading, setLoading] = React.useState(true)
  const [expandedCourses, setExpandedCourses] = React.useState<Record<string, boolean>>({})
  const [modulesByCourse, setModulesByCourse] = React.useState<
    Record<string, CourseModule[]>
  >({})
  const [modulesLoading, setModulesLoading] = React.useState<Record<string, boolean>>(
    {}
  )

  const [newCourse, setNewCourse] = React.useState({ title: "", description: "" })
  const [creatingCourse, setCreatingCourse] = React.useState(false)
  const [editingCourseId, setEditingCourseId] = React.useState<string | null>(null)
  const [courseDrafts, setCourseDrafts] = React.useState<
    Record<string, { title: string; description: string }>
  >({})
  const [savingCourseId, setSavingCourseId] = React.useState<string | null>(null)
  const [deletingCourseId, setDeletingCourseId] = React.useState<string | null>(null)

  const [newModuleDrafts, setNewModuleDrafts] = React.useState<
    Record<string, ModuleDraft>
  >({})
  const [editingModuleId, setEditingModuleId] = React.useState<string | null>(null)
  const [moduleDrafts, setModuleDrafts] = React.useState<Record<string, ModuleDraft>>(
    {}
  )
  const [savingModuleId, setSavingModuleId] = React.useState<string | null>(null)
  const [deletingModuleId, setDeletingModuleId] = React.useState<string | null>(null)

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

  const loadModules = React.useCallback(async (courseId: string) => {
    setModulesLoading((prev) => ({ ...prev, [courseId]: true }))
    try {
      const modules = await fetchCourseModules(courseId)
      setModulesByCourse((prev) => ({ ...prev, [courseId]: modules }))
    } catch (error) {
      console.error("Erro ao carregar módulos", error)
      setModulesByCourse((prev) => ({ ...prev, [courseId]: [] }))
    } finally {
      setModulesLoading((prev) => ({ ...prev, [courseId]: false }))
    }
  }, [])

  const handleToggleCourse = async (courseId: string) => {
    setExpandedCourses((prev) => {
      const next = { ...prev, [courseId]: !prev[courseId] }
      return next
    })
    if (!modulesByCourse[courseId]) {
      await loadModules(courseId)
    }
  }

  const handleCreateCourse = async () => {
    if (!newCourse.title.trim()) return
    setCreatingCourse(true)
    try {
      await createCourse({
        title: newCourse.title.trim(),
        description: newCourse.description.trim(),
      })
      setNewCourse({ title: "", description: "" })
      await refreshCourses()
    } catch (error) {
      console.error("Erro ao criar curso", error)
    } finally {
      setCreatingCourse(false)
    }
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id)
    setCourseDrafts((prev) => ({
      ...prev,
      [course.id]: {
        title: course.title,
        description: course.description || "",
      },
    }))
  }

  const handleSaveCourse = async (courseId: string) => {
    const draft = courseDrafts[courseId]
    if (!draft?.title?.trim()) return
    setSavingCourseId(courseId)
    try {
      await updateCourse(courseId, {
        title: draft.title.trim(),
        description: draft.description.trim(),
      })
      setEditingCourseId(null)
      await refreshCourses()
    } catch (error) {
      console.error("Erro ao atualizar curso", error)
    } finally {
      setSavingCourseId(null)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm("Deseja apagar este curso e todos os módulos?")) return
    setDeletingCourseId(courseId)
    try {
      await deleteCourse(courseId)
      setModulesByCourse((prev) => {
        const next = { ...prev }
        delete next[courseId]
        return next
      })
      await refreshCourses()
    } catch (error) {
      console.error("Erro ao apagar curso", error)
    } finally {
      setDeletingCourseId(null)
    }
  }

  const handleNewModuleChange = (
    courseId: string,
    update: Partial<ModuleDraft>
  ) => {
    setNewModuleDrafts((prev) => ({
      ...prev,
      [courseId]: {
        title: "",
        notes: "",
        videoFile: null,
        ...prev[courseId],
        ...update,
      },
    }))
  }

  const handleCreateModule = async (courseId: string) => {
    const draft = newModuleDrafts[courseId]
    if (!draft?.title?.trim()) return
    setSavingModuleId(courseId)
    try {
      await createCourseModule({
        courseId,
        title: draft.title.trim(),
        notes: draft.notes.trim(),
        videoFile: draft.videoFile,
      })
      handleNewModuleChange(courseId, { title: "", notes: "", videoFile: null })
      await loadModules(courseId)
    } catch (error) {
      console.error("Erro ao criar módulo", error)
    } finally {
      setSavingModuleId(null)
    }
  }

  const handleEditModule = (module: CourseModule) => {
    setEditingModuleId(module.id)
    setModuleDrafts((prev) => ({
      ...prev,
      [module.id]: {
        title: module.title,
        notes: module.notes,
        videoFile: null,
      },
    }))
  }

  const handleSaveModule = async (courseId: string, module: CourseModule) => {
    const draft = moduleDrafts[module.id]
    if (!draft?.title?.trim()) return
    setSavingModuleId(module.id)
    try {
      await updateCourseModule({
        courseId,
        moduleId: module.id,
        title: draft.title.trim(),
        notes: draft.notes.trim(),
        videoFile: draft.videoFile,
        previousVideoPath: module.videoPath || null,
      })
      setEditingModuleId(null)
      await loadModules(courseId)
    } catch (error) {
      console.error("Erro ao atualizar módulo", error)
    } finally {
      setSavingModuleId(null)
    }
  }

  const handleDeleteModule = async (courseId: string, module: CourseModule) => {
    if (!window.confirm("Deseja apagar este módulo?")) return
    setDeletingModuleId(module.id)
    try {
      await deleteCourseModule({
        courseId,
        moduleId: module.id,
        videoPath: module.videoPath || null,
      })
      await loadModules(courseId)
    } catch (error) {
      console.error("Erro ao apagar módulo", error)
    } finally {
      setDeletingModuleId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Cursos</h1>
          <p className="text-sm text-white/60">
            Crie cursos e organize módulos com vídeos e notas.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg font-semibold">Novo curso</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70">Título</label>
            <input
              value={newCourse.title}
              onChange={(event) =>
                setNewCourse((prev) => ({ ...prev, title: event.target.value }))
              }
              className="h-11 w-full rounded-md border border-white/10 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
              placeholder="Ex: Musicalidade"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70">Descrição</label>
            <input
              value={newCourse.description}
              onChange={(event) =>
                setNewCourse((prev) => ({ ...prev, description: event.target.value }))
              }
              className="h-11 w-full rounded-md border border-white/10 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
              placeholder="Uma breve visão do curso"
            />
          </div>
        </div>
        <button
          onClick={handleCreateCourse}
          disabled={creatingCourse}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {creatingCourse ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Criar curso
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <div className="flex items-center gap-2 text-white/70">
            <Loader2 className="size-4 animate-spin" />
            Carregando cursos...
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-white/70">
            Nenhum curso cadastrado ainda.
          </div>
        ) : (
          courses.map((course) => {
            const isEditing = editingCourseId === course.id
            const draft = courseDrafts[course.id] || {
              title: course.title,
              description: course.description || "",
            }
            const modules = modulesByCourse[course.id] || []
            const moduleDraft = newModuleDrafts[course.id] || {
              title: "",
              notes: "",
              videoFile: null,
            }

            return (
              <div
                key={course.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    {isEditing ? (
                      <>
                        <input
                          value={draft.title}
                          onChange={(event) =>
                            setCourseDrafts((prev) => ({
                              ...prev,
                              [course.id]: { ...draft, title: event.target.value },
                            }))
                          }
                          className="h-10 w-full rounded-md border border-white/10 bg-black/60 px-3 text-base text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                        />
                        <input
                          value={draft.description}
                          onChange={(event) =>
                            setCourseDrafts((prev) => ({
                              ...prev,
                              [course.id]: { ...draft, description: event.target.value },
                            }))
                          }
                          className="h-10 w-full rounded-md border border-white/10 bg-black/60 px-3 text-sm text-white/80 outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        {course.description && (
                          <p className="text-sm text-white/60">{course.description}</p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveCourse(course.id)}
                        disabled={savingCourseId === course.id}
                        className="inline-flex items-center gap-2 rounded-md border border-[#f29b0f] px-3 py-1.5 text-xs font-semibold text-[#f29b0f] transition hover:bg-[#f29b0f]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {savingCourseId === course.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Pencil className="size-3" />
                        )}
                        Salvar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[#f29b0f] hover:text-white"
                      >
                        <Pencil className="size-3" />
                        Editar
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      disabled={deletingCourseId === course.id}
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingCourseId === course.id ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Trash2 className="size-3" />
                      )}
                      Apagar
                    </button>
                    <button
                      onClick={() => handleToggleCourse(course.id)}
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[#f29b0f] hover:text-white"
                    >
                      {expandedCourses[course.id] ? "Ocultar módulos" : "Ver módulos"}
                    </button>
                  </div>
                </div>

                {expandedCourses[course.id] && (
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <h4 className="text-base font-semibold">Módulos</h4>
                    {modulesLoading[course.id] ? (
                      <div className="mt-3 flex items-center gap-2 text-white/60">
                        <Loader2 className="size-4 animate-spin" />
                        Carregando módulos...
                      </div>
                    ) : modules.length === 0 ? (
                      <p className="mt-3 text-sm text-white/60">
                        Ainda não existem módulos para este curso.
                      </p>
                    ) : (
                      <div className="mt-4 space-y-4">
                        {modules.map((module) => {
                          const isEditingModule = editingModuleId === module.id
                          const moduleDraft = moduleDrafts[module.id] || {
                            title: module.title,
                            notes: module.notes,
                            videoFile: null,
                          }
                          return (
                            <div
                              key={module.id}
                              className="rounded-xl border border-white/10 bg-black/50 p-4"
                            >
                              {isEditingModule ? (
                                <div className="space-y-3">
                                  <input
                                    value={moduleDraft.title}
                                    onChange={(event) =>
                                      setModuleDrafts((prev) => ({
                                        ...prev,
                                        [module.id]: {
                                          ...moduleDraft,
                                          title: event.target.value,
                                        },
                                      }))
                                    }
                                    className="h-10 w-full rounded-md border border-white/10 bg-black/60 px-3 text-base text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                                  />
                                  <textarea
                                    value={moduleDraft.notes}
                                    onChange={(event) =>
                                      setModuleDrafts((prev) => ({
                                        ...prev,
                                        [module.id]: {
                                          ...moduleDraft,
                                          notes: event.target.value,
                                        },
                                      }))
                                    }
                                    className="min-h-[120px] w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                                  />
                                  <div className="flex flex-wrap items-center gap-3">
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={(event) =>
                                        setModuleDrafts((prev) => ({
                                          ...prev,
                                          [module.id]: {
                                            ...moduleDraft,
                                            videoFile: event.target.files?.[0] || null,
                                          },
                                        }))
                                      }
                                      className="text-sm text-white/70"
                                    />
                                    <button
                                      onClick={() => handleSaveModule(course.id, module)}
                                      disabled={savingModuleId === module.id}
                                      className="inline-flex items-center gap-2 rounded-md border border-[#f29b0f] px-3 py-1.5 text-xs font-semibold text-[#f29b0f] transition hover:bg-[#f29b0f]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                      {savingModuleId === module.id ? (
                                        <Loader2 className="size-3 animate-spin" />
                                      ) : (
                                        <Pencil className="size-3" />
                                      )}
                                      Salvar módulo
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <h5 className="text-lg font-semibold">{module.title}</h5>
                                      {module.videoUrl && (
                                        <a
                                          href={module.videoUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-sm text-[#f29b0f] hover:text-[#ffb357]"
                                        >
                                          Ver vídeo
                                        </a>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      <button
                                        onClick={() => handleEditModule(module)}
                                        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[#f29b0f] hover:text-white"
                                      >
                                        <Pencil className="size-3" />
                                        Editar
                                      </button>
                                      <button
                                        onClick={() => handleDeleteModule(course.id, module)}
                                        disabled={deletingModuleId === module.id}
                                        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                      >
                                        {deletingModuleId === module.id ? (
                                          <Loader2 className="size-3 animate-spin" />
                                        ) : (
                                          <Trash2 className="size-3" />
                                        )}
                                        Apagar
                                      </button>
                                    </div>
                                  </div>
                                  {module.notes && (
                                    <p className="mt-3 whitespace-pre-wrap text-sm text-white/70">
                                      {module.notes}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <div className="mt-6 rounded-xl border border-white/10 bg-black/50 p-4">
                      <h5 className="text-sm font-semibold">Novo módulo</h5>
                      <div className="mt-3 grid gap-3">
                        <input
                          value={moduleDraft.title}
                          onChange={(event) =>
                            handleNewModuleChange(course.id, { title: event.target.value })
                          }
                          className="h-10 w-full rounded-md border border-white/10 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                          placeholder="Título do módulo"
                        />
                        <textarea
                          value={moduleDraft.notes}
                          onChange={(event) =>
                            handleNewModuleChange(course.id, { notes: event.target.value })
                          }
                          className="min-h-[120px] w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/20"
                          placeholder="Notas do módulo"
                        />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) =>
                            handleNewModuleChange(course.id, {
                              videoFile: event.target.files?.[0] || null,
                            })
                          }
                          className="text-sm text-white/70"
                        />
                      </div>
                      <button
                        onClick={() => handleCreateModule(course.id)}
                        disabled={savingModuleId === course.id}
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#f29b0f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {savingModuleId === course.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                        Adicionar módulo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
