import { useParams } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { getFootnotes } from '~/server/database'
import { For, Show } from 'solid-js'
import { createSelectedFont } from '~/providers/FontProvider'

export const Footnotes = (props) => {
  const params = useParams()
  const font = createSelectedFont()

  const footnotes = createServerData$(
    (value) => getFootnotes(value[0], value[1], value[2], value[3]),
    {
      key() {
        return [
          params.title,
          params.translator,
          props.chapterNumber,
          props.paragraphNumber,
        ]
      },
    }
  )

  return (
    <For each={footnotes()}>
      {(footnote, index) => (
        <Show
          when={props.showFootnotes === true && index() === props.footnoteCount}
        >
          <aside
            style={{ 'font-family': font() }}
            class='text-textColor bg-subMenuColor rounded-md px-2'
          >
            {footnote + ' '}
          </aside>
        </Show>
      )}
    </For>
  )
}
