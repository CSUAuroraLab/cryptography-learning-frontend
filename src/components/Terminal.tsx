import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Terminal as Term } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

type TerminalProps = {
  host: string
  port: number
}

export const Terminal: React.FC<TerminalProps> = ({ host, port }) => {
  const terminalRef = React.createRef<HTMLDivElement>()
  const xterm = new Term({
    cursorBlink: true,
    scrollback: 1000,
    tabStopWidth: 8,
    convertEol: true,
  })

  const fitAddon = new FitAddon()
  xterm.loadAddon(fitAddon)
  useEffect(() => {
    if(terminalRef.current) {
      xterm.open(terminalRef.current)
      const ws = new WebSocket('ws://' + host + ':' + port)
      xterm.focus()
      fitAddon.fit()
      xterm.onData((data) => {
        xterm.write(data)
      })
      xterm.onKey(({key}) => {
        if (key.charCodeAt(0) === 13){
          xterm.write('\n')
        }
      })

      ws.onmessage = (event) => {
        xterm.write('\n')
        xterm.write(event.data)
      }
      
      ws.onopen = () => {
        xterm.loadAddon(new AttachAddon(ws))
      }
      ws.onerror = (e) =>  { throw e }
      ws.onclose = () => {
        const red = `\x1b[31m`
        xterm.writeln('\n' + red + 'WEBSOCKET DISCONNECTED, PRESS ENTER TO EXIT')
        xterm.setOption('disableStdin', true)
        xterm.onKey(({key}) => {
          if (key.length === 1 && key.charCodeAt(0) === 27){
            xterm.dispose()
          }
        })
      }
    }
  }, [xterm, terminalRef, fitAddon])
  
  return <div ref={terminalRef}></div>
}