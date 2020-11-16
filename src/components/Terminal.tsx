import React, { useEffect } from 'react'
import { Terminal as Term } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

type TerminalProps = {
  host: string
  port: number
  id?: string
}

export const Terminal: React.FC<TerminalProps> = ({ host, port, id }) => {
  const terminalRef = React.useRef<HTMLDivElement>(null)
  const xterm = new Term({
    cursorBlink: true,
    scrollback: 1000,
    tabStopWidth: 8,
    convertEol: true,
  })

  const fitAddon = new FitAddon()
  xterm.loadAddon(fitAddon)
  useEffect(() => {
    if(terminalRef.current && !terminalRef.current.children.length) {
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
      ws.onerror = (e) =>  { console.log(e) }
      ws.onclose = () => {
        const red = `\x1b[31m`
        xterm.writeln('\n' + red + 'WEBSOCKET DISCONNECTED, PRESS ESC TO EXIT')
        xterm.setOption('disableStdin', true)
        xterm.onKey(({key}) => {
          if (key.length === 1 && key.charCodeAt(0) === 27){
            xterm.dispose()
          }
        })
      }
    }
  }, [xterm, terminalRef, fitAddon, host, port])
  
  return <div ref={terminalRef} id={id ?? 'terminal'}></div>
}