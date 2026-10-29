/* Vista previa dentro del editor: muestra la guía con el estilo del blog mientras la escribes. */
(function () {
  if (!window.CMS || !window.createClass || !window.h) return;
  var h = window.h;
  CMS.registerPreviewStyle('/css/tokens.css');
  CMS.registerPreviewStyle('/blog/blog.css');
  var css = ':root{--paper:#F4EFE2;--ink:#1B1712;--mut:#716A5C;--line:rgba(27,23,18,.16);--clay:#B0714C}' +
    'body{background:var(--paper);color:var(--ink);font:300 17px/1.75 var(--sans);margin:0}' +
    '.wrap{padding-top:30px}';
  var Post = createClass({
    render: function () {
      var e = this.props.entry, get = function (k) { return e.getIn(['data', k]); };
      var glance = get('glance'), items = glance && glance.map ? glance.toJS() : [];
      var img = get('image');
      return h('div', {},
        h('style', {}, css),
        h('div', { className: 'wrap' },
          h('div', { className: 'ph' },
            h('p', { className: 'lab' }, [get('category'), get('date') ? String(get('date')).slice(0, 10) : ''].filter(Boolean).join(' · ')),
            h('h1', {}, get('title') || '(sin título)')),
          img ? h('figure', { className: 'pimg' }, h('img', { src: this.props.getAsset(img).toString(), alt: get('image_alt') || '' })) : null,
          h('div', { className: 'body' },
            items.length ? h('aside', { className: 'glance' },
              h('p', { className: 'lab' }, get('glance_title') || ''),
              h('ul', {}, items.map(function (g, i) { return h('li', { key: i }, h('strong', {}, g.label + ':'), ' ' + g.text); }))) : null,
            this.props.widgetFor('body'))));
    }
  });
  CMS.registerPreviewTemplate('blog', Post);
})();
