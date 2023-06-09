import { getChapterList } from '~/server/database'
import { createServerData$ } from 'solid-start/server'
import { useParams } from 'solid-start'
import { createEffect, For } from 'solid-js'
import { Paragraphs } from './Paragraphs'
import { createSelectedFont } from '~/providers/FontProvider'

export const Chapters = (props) => {
  const params = useParams()
  const font = createSelectedFont()

  const chapterList = createServerData$(
    (value) => getChapterList(value[0], value[1]),
    {
      key() {
        return [params.title, params.translator]
      },
    }
  )

  createEffect(() => {
    props.setParagraphsLoaded('unresolved')
    props.setParagraphsLoaded(chapterList.state)
  })

  return (
    <For
      each={chapterList()}
      fallback={<div class='text-textColor'>Loading Chapters...</div>}
    >
      {(chapter) => (
        <>
          <h2
            ref={(el) => props.setAllChapters((p) => [...p, el])}
            style={{ 'font-family': font() }}
            class='snap-center text-textColor font-bold'
          >
            {chapter.chapterName}
          </h2>
          <Paragraphs chapterNumber={chapter.chapterNumber} />
          <div class='h-full' />
        </>
      )}
    </For>
  )
}
