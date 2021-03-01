import React from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import RemarkMathPlugin from 'remark-math'
import { BlockMath, InlineMath } from 'react-katex'
import AdmonitionsPlugin from "remark-containers"
import { Callout } from './Callout'
import { IconName, Intent } from '@blueprintjs/core'
import 'katex/dist/katex.min.css'
import styled from '@emotion/styled/macro'

const getIcon = (name: string) => {
  const names = [
    'add', 'add-column-left', 'add-column-right', 'add-row-bottom', 'add-row-top', 'add-to-artifact', 'add-to-folder', 'airplane', 'align-center', 'align-justify', 'align-left', 'align-right', 'alignment-bottom', 'alignment-horizontal-center', 'alignment-left', 'alignment-right', 'alignment-top', 'alignment-vertical-center', 'annotation', 'app-header', 'application', 'applications', 'archive', 'arrow-bottom-left', 'arrow-bottom-right', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-top-left', 'arrow-top-right', 'arrow-up', 'arrows-horizontal', 'arrows-vertical', 'asterisk', 'automatic-updates', 'backlink', 'badge', 'ban-circle', 'bank-account', 'barcode', 'blank', 'blocked-person', 'bold', 'book', 'bookmark', 'box', 'briefcase', 'bring-data', 'build', 'calculator', 'calendar', 'camera', 'caret-down', 'caret-left', 'caret-right', 'caret-up', 'cell-tower', 'changes', 'chart', 'chat', 'chevron-backward', 'chevron-down', 'chevron-forward', 'chevron-left', 'chevron-right', 'chevron-up', 'circle', 'circle-arrow-down', 'circle-arrow-left', 'circle-arrow-right', 'circle-arrow-up', 'citation', 'clean', 'clipboard', 'cloud', 'cloud-download', 'cloud-upload', 'code', 'code-block', 'cog', 'collapse-all', 'column-layout', 'comment', 'comparison', 'compass', 'compressed', 'confirm', 'console', 'contrast', 'control', 'credit-card', 'cross', 'crown', 'cube', 'cube-add', 'cube-remove', 'curved-range-chart', 'cut', 'cycle', 'dashboard', 'data-lineage', 'database', 'delete', 'delta', 'derive-column', 'desktop', 'diagnosis', 'diagram-tree', 'direction-left', 'direction-right', 'disable', 'document', 'document-open', 'document-share', 'dollar', 'dot', 'double-caret-horizontal', 'double-caret-vertical', 'double-chevron-down', 'double-chevron-left', 'double-chevron-right', 'double-chevron-up', 'doughnut-chart', 'download', 'drag-handle-horizontal', 'drag-handle-vertical', 'draw', 'drawer-left', 'drawer-left-filled', 'drawer-right', 'drawer-right-filled', 'drive-time', 'duplicate', 'edit', 'eject', 'endorsed', 'envelope', 'equals', 'eraser', 'error', 'euro', 'exchange', 'exclude-row', 'expand-all', 'export', 'eye-off', 'eye-on', 'eye-open', 'fast-backward', 'fast-forward', 'feed', 'feed-subscribed', 'film', 'filter', 'filter-keep', 'filter-list', 'filter-open', 'filter-remove', 'flag', 'flame', 'flash', 'floppy-disk', 'flow-branch', 'flow-end', 'flow-linear', 'flow-review', 'flow-review-branch', 'flows', 'folder-close', 'folder-new', 'folder-open', 'folder-shared', 'folder-shared-open', 'follower', 'following', 'font', 'fork', 'form', 'full-circle', 'full-stacked-chart', 'fullscreen', 'function', 'gantt-chart', 'geofence', 'geolocation', 'geosearch', 'git-branch', 'git-commit', 'git-merge', 'git-new-branch', 'git-pull', 'git-push', 'git-repo', 'glass', 'globe', 'globe-network', 'graph', 'graph-remove', 'greater-than', 'greater-than-or-equal-to', 'grid', 'grid-view', 'group-objects', 'grouped-bar-chart', 'hand', 'hand-down', 'hand-left', 'hand-right', 'hand-up', 'hat', 'header', 'header-one', 'header-two', 'headset', 'heart', 'heart-broken', 'heat-grid', 'heatmap', 'help', 'helper-management', 'highlight', 'history', 'home', 'horizontal-bar-chart', 'horizontal-bar-chart-asc', 'horizontal-bar-chart-desc', 'horizontal-distribution', 'id-number', 'image-rotate-left', 'image-rotate-right', 'import', 'inbox', 'inbox-filtered', 'inbox-geo', 'inbox-search', 'inbox-update', 'info-sign', 'inheritance', 'inherited-group', 'inner-join', 'insert', 'intersection', 'ip-address', 'issue', 'issue-closed', 'issue-new', 'italic', 'join-table', 'key', 'key-backspace', 'key-command', 'key-control', 'key-delete', 'key-enter', 'key-escape', 'key-option', 'key-shift', 'key-tab', 'known-vehicle', 'lab-test', 'label', 'layer', 'layers', 'layout', 'layout-auto', 'layout-balloon', 'layout-circle', 'layout-grid', 'layout-group-by', 'layout-hierarchy', 'layout-linear', 'layout-skew-grid', 'layout-sorted-clusters', 'learning', 'left-join', 'less-than', 'less-than-or-equal-to', 'lifesaver', 'lightbulb', 'link', 'list', 'list-columns', 'list-detail-view', 'locate', 'lock', 'log-in', 'log-out', 'manual', 'manually-entered-data', 'map', 'map-create', 'map-marker', 'maximize', 'media', 'menu', 'menu-closed', 'menu-open', 'merge-columns', 'merge-links', 'minimize', 'minus', 'mobile-phone', 'mobile-video', 'modal', 'modal-filled', 'moon', 'more', 'mountain', 'move', 'mugshot', 'multi-select', 'music', 'new-drawing', 'new-grid-item', 'new-layer', 'new-layers', 'new-link', 'new-object', 'new-person', 'new-prescription', 'new-text-box', 'ninja', 'not-equal-to', 'notifications', 'notifications-updated', 'numbered-list', 'numerical', 'office', 'offline', 'oil-field', 'one-column', 'outdated', 'page-layout', 'panel-stats', 'panel-table', 'paperclip', 'paragraph', 'path', 'path-search', 'pause', 'people', 'percentage', 'person', 'phone', 'pie-chart', 'pin', 'pivot', 'pivot-table', 'play', 'plus', 'polygon-filter', 'power', 'predictive-analysis', 'prescription', 'presentation', 'print', 'projects', 'properties', 'property', 'publish-function', 'pulse', 'random', 'record', 'redo', 'refresh', 'regression-chart', 'remove', 'remove-column', 'remove-column-left', 'remove-column-right', 'remove-row-bottom', 'remove-row-top', 'repeat', 'reset', 'resolve', 'rig', 'right-join', 'ring', 'rotate-document', 'rotate-page', 'route', 'satellite', 'saved', 'scatter-plot', 'search', 'search-around', 'search-template', 'search-text', 'segmented-control', 'select', 'selection', 'send-message', 'send-to', 'send-to-graph', 'send-to-map', 'series-add', 'series-configuration', 'series-derived', 'series-filtered', 'series-search', 'settings', 'share', 'shield', 'shop', 'shopping-cart', 'signal-search', 'sim-card', 'slash', 'small-cross', 'small-minus', 'small-plus', 'small-tick', 'snowflake', 'social-media', 'sort', 'sort-alphabetical', 'sort-alphabetical-desc', 'sort-asc', 'sort-desc', 'sort-numerical', 'sort-numerical-desc', 'split-columns', 'square', 'stacked-chart', 'star', 'star-empty', 'step-backward', 'step-chart', 'step-forward', 'stop', 'stopwatch', 'strikethrough', 'style', 'swap-horizontal', 'swap-vertical', 'symbol-circle', 'symbol-cross', 'symbol-diamond', 'symbol-square', 'symbol-triangle-down', 'symbol-triangle-up', 'tag', 'take-action', 'taxi', 'text-highlight', 'th', 'th-derived', 'th-disconnect', 'th-filtered', 'th-list', 'thumbs-down', 'thumbs-up', 'tick', 'tick-circle', 'time', 'timeline-area-chart', 'timeline-bar-chart', 'timeline-events', 'timeline-line-chart', 'tint', 'torch', 'tractor', 'train', 'translate', 'trash', 'tree', 'trending-down', 'trending-up', 'truck', 'two-columns', 'unarchive', 'underline', 'undo', 'ungroup-objects', 'unknown-vehicle', 'unlock', 'unpin', 'unresolve', 'updated', 'upload', 'user', 'variable', 'vertical-bar-chart-asc', 'vertical-bar-chart-desc', 'vertical-distribution', 'video', 'virus', 'volume-down', 'volume-off', 'volume-up', 'walk', 'warning-sign', 'waterfall-chart', 'widget', 'widget-button', 'widget-footer', 'widget-header', 'wrench', 'zoom-in', 'zoom-out', 'zoom-to-fit'
  ]
  if (names.includes(name)) {
    return name as IconName
  }
  return null
}

type MarkdownCalloutProps = {
  intent: Intent
  data: {
    hProperties: {
      className: string
    }
  }
  children: React.ReactElement
}

const MarkdownCallout: React.FC<MarkdownCalloutProps> = ({intent, data, children}) => {
  const dataList = data.hProperties.className.split(' ')
  const alwaysOpen = dataList.length > 1 && dataList[0]
  let offset = alwaysOpen ? 1 : 0
  let iconName: IconName | null | undefined = undefined
  if (dataList.length > offset && dataList[offset].startsWith('ICON:') ) {
    iconName = getIcon(dataList[offset].substr(5))
    offset += 1
  } 
  return <Callout 
    intent={intent} 
    icon={iconName} 
    title={dataList.slice(offset).join(' ')}
  >
    {children}
  </Callout>
}

type CodeBlockProps = {
  value: string
  language?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value, language }) => {
  return <><SyntaxHighlighter language={language}>
    {value}
  </SyntaxHighlighter></>
}

type MarkdownProps = {
  source: string
}

const Pre = styled.pre`
  display: inline-block;
  white-space: pre;
`

const InlineCode: React.FC = ({ children }) => {
  return <Pre><code>{children}</code></Pre>
}

/** support block math/inline math/admonitions */
export const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  /**
   * use ::: (none|primary|success|warning|danger) [ICON:icon-name] title with any char
   *     content between
   *     :::
   * for admonitions
   * ICON name could be omit where intent will derive icon
   */
  return <ReactMarkdown
    source={source}
    plugins={[
      RemarkMathPlugin,
      AdmonitionsPlugin
    ]}
    renderers={{
      code: CodeBlock,
      inlineCode: InlineCode,
      math: ({ value }) => <BlockMath>{value}</BlockMath>,
      inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
      none: (props) => <MarkdownCallout intent='none' {...props} />,
      primary: (props) => <MarkdownCallout intent='primary' {...props} />,
      success: (props) => <MarkdownCallout intent='success' {...props} />,
      warning: (props) => <MarkdownCallout intent='warning' {...props} />,
      danger: (props) => <MarkdownCallout intent='danger' {...props} />,
    }}
  />
}