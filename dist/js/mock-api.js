/* ============================================================
   Contasy – Mock API Interceptor
   Intercepta XMLHttpRequest para api-contasy.com e retorna
   dados mockados após um delay (skeleton effect).
   ============================================================ */
(function () {
  'use strict';

  var DELAY = 1800; // ms de skeleton antes de exibir dados

  /* ── Helpers ─────────────────────────────────────────────── */
  function month(mm, yyyy, revenue, entries, expenses, taxes, rbt12, rbt12p, range, limit, rate) {
    var pad = mm < 10 ? '0' + mm : '' + mm;
    return {
      tax_period: pad + '-' + yyyy,
      revenue:    revenue,
      entries:    entries,
      expenses:   expenses,
      taxes:      taxes,
      rbt12:      rbt12,
      rbt12p:     rbt12p,
      range:      range,
      limit:      limit,
      rate:       rate
    };
  }

  /* ── Dados mensais (todos em centavos) ────────────────────── */
  //  tax_period    rev       ent        exp      tax      rbt12     rbt12p   faixa  limite    rate
  var months2024 = [
    month( 1, 2024,  980000, 1180000,  220000,  58800, 10800000,  9200000, 1, 18000000, 6.0),
    month( 2, 2024, 1050000, 1260000,  230000,  63000, 11200000,  9600000, 1, 18000000, 6.0),
    month( 3, 2024, 1120000, 1340000,  245000,  67200, 11800000, 10100000, 1, 18000000, 6.0),
    month( 4, 2024, 1200000, 1440000,  250000,  72000, 12500000, 10800000, 1, 18000000, 6.0),
    month( 5, 2024, 1350000, 1620000,  260000,  81000, 13200000, 11500000, 1, 18000000, 6.0),
    month( 6, 2024, 1280000, 1540000,  255000,  76800, 13600000, 11900000, 1, 18000000, 6.0),
    month( 7, 2024, 1380000, 1660000,  270000,  82800, 14100000, 12400000, 1, 18000000, 6.0),
    month( 8, 2024, 1450000, 1740000,  280000,  87000, 14700000, 12900000, 1, 18000000, 6.0),
    month( 9, 2024, 1300000, 1560000,  265000,  78000, 15000000, 13200000, 1, 18000000, 6.0),
    month(10, 2024, 1600000, 1920000,  295000,  96000, 15800000, 13900000, 1, 18000000, 6.0),
    month(11, 2024, 1750000, 2100000,  310000, 105000, 16500000, 14500000, 1, 18000000, 6.0),
    month(12, 2024, 1900000, 2280000,  320000, 114000, 17200000, 15100000, 1, 18000000, 6.0)
  ];

  var months2025 = [
    month( 1, 2025, 1420000, 1704000,  285000,  85200, 15800000, 13900000, 1, 18000000, 6.0),
    month( 2, 2025, 1580000, 1896000,  300000,  94800, 16300000, 14300000, 1, 18000000, 6.0),
    month( 3, 2025, 1650000, 1980000,  315000,  99000, 16900000, 14800000, 1, 18000000, 6.0),
    month( 4, 2025, 1720000, 2064000,  325000, 103200, 17500000, 15400000, 1, 18000000, 6.0),
    month( 5, 2025, 1850000, 2220000,  340000, 111000, 18100000, 15900000, 2, 36000000, 11.2),
    month( 6, 2025, 1780000, 2136000,  330000, 106800, 18600000, 16400000, 2, 36000000, 11.2),
    month( 7, 2025, 1920000, 2304000,  355000, 115200, 19200000, 16900000, 2, 36000000, 11.2),
    month( 8, 2025, 2050000, 2460000,  370000, 123000, 19900000, 17500000, 2, 36000000, 11.2),
    month( 9, 2025, 1980000, 2376000,  360000, 118800, 20400000, 17900000, 2, 36000000, 11.2),
    month(10, 2025, 2200000, 2640000,  390000, 132000, 21100000, 18500000, 2, 36000000, 11.2),
    month(11, 2025, 2350000, 2820000,  410000, 141000, 21900000, 19200000, 2, 36000000, 11.2),
    month(12, 2025, 2480000, 2976000,  425000, 148800, 22600000, 19800000, 2, 36000000, 11.2)
  ];

  /* ── Distribuição de lucros ───────────────────────────────── */
  function profitMonths(year) {
    var baseAmounts = [410000,480000,500000,520000,550000,530000,560000,590000,570000,620000,660000,680000];
    return baseAmounts.map(function (amt, idx) {
      var mm = idx + 1;
      return { period: (mm < 10 ? '0' + mm : '' + mm), directors: [{ director_id: 1, amount: amt }] };
    });
  }

  /* ── Respostas mockadas ──────────────────────────────────── */
  var MOCK = {
    '/company/finance': function () {
      return {
        finance: {
          '2024': months2024,
          '2025': months2025
        },
        simples: {
          rbt12:      22600000,
          rbt12p:     19800000,
          range:      2,
          limit:      36000000,
          anex:       3,
          anexes:     [3],
          next_rates: [11.2]
        },
        profitDistribution: {
          '2024': {
            total: 5670000,
            directors: [{ director_id: 1, name: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA', total: 5670000 }],
            months: profitMonths(2024)
          },
          '2025': {
            total: 6670000,
            directors: [{ director_id: 1, name: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA', total: 6670000 }],
            months: profitMonths(2025)
          }
        }
      };
    },

    '/company/details': function () {
      return {
        id: 1,
        name: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA',
        tax_regime: 'simples_nacional',
        cnpj: '00.000.000/0001-00',
        opened_at: '2020-01-01',
        tax_period_start: '01-2020',
        taxes: [
          { id: 1, status: 'paid',    tax_period: '03-2025', due_at: '2025-04-20', file_link: 'https://example.com/file1.pdf' },
          { id: 2, status: 'paid',    tax_period: '04-2025', due_at: '2025-05-20', file_link: 'https://example.com/file2.pdf' },
          { id: 3, status: 'pending', tax_period: '05-2025', due_at: '2025-06-20', file_link: null }
        ]
      };
    },

    '/user': function () {
      return {
        id: 1,
        name: 'Usuário Demo',
        email: 'demo@contasy.com',
        role: 0,
        group: null,
        registerComplete: true,
        profileComplete: true,
        affiliate: false,
        force_login: 0,
          companies: [{ id: 1, name: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA', opened_at: '2020-01-01' }],
        ability: [
          { action: 'read', subject: 'panel' },
          { action: 'read', subject: 'user' },
          { action: 'read', subject: 'companies' },
          { action: 'read', subject: 'taxes' },
          { action: 'read', subject: 'subscriptions' },
          { action: 'read', subject: 'digital_certificate' },
          { action: 'read', subject: 'companies_list' },
          { action: 'read', subject: 'affiliate' },
          { action: 'read', subject: 'checkout' }
        ]
      };
    }
  };

  /* ── Detecta qual mock usar baseado na URL ───────────────── */
  function getMock(url) {
    for (var pattern in MOCK) {
      if (url.indexOf(pattern) !== -1) {
        return MOCK[pattern];
      }
    }
    return null;
  }

  /* ── Interceptor de XMLHttpRequest ───────────────────────── */
  var _open = XMLHttpRequest.prototype.open;
  var _send = XMLHttpRequest.prototype.send;
  var _setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this._mockFn  = null;
    this._mockUrl = url;

    if (typeof url === 'string' && url.indexOf('api-contasy.com') !== -1) {
      this._mockFn = getMock(url);
    }

    if (!this._mockFn) {
      return _open.apply(this, arguments);
    }
    // Para requests mockados: não abrimos o XHR real
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (!this._mockFn) {
      return _setRequestHeader.apply(this, arguments);
    }
    // Ignora headers em requests mockados
  };

  XMLHttpRequest.prototype.send = function (body) {
    if (!this._mockFn) {
      return _send.apply(this, arguments);
    }

    var self = this;
    var mockFn = self._mockFn;

    setTimeout(function () {
      var data = mockFn();
      var json = JSON.stringify(data);

      Object.defineProperty(self, 'readyState',    { get: function () { return 4; },    configurable: true });
      Object.defineProperty(self, 'status',        { get: function () { return 200; },  configurable: true });
      Object.defineProperty(self, 'statusText',    { get: function () { return 'OK'; }, configurable: true });
      Object.defineProperty(self, 'response',      { get: function () { return json; }, configurable: true });
      Object.defineProperty(self, 'responseText',  { get: function () { return json; }, configurable: true });
      Object.defineProperty(self, 'responseURL',   { get: function () { return self._mockUrl; }, configurable: true });

      if (typeof self.onreadystatechange === 'function') {
        self.onreadystatechange.call(self);
      }
      if (typeof self.onload === 'function') {
        self.onload.call(self);
      }

      var loadEvent = new Event('load');
      self.dispatchEvent(loadEvent);
      var loadendEvent = new Event('loadend');
      self.dispatchEvent(loadendEvent);
    }, DELAY);
  };

  /* getResponseHeader e getAllResponseHeaders para compatibilidade com axios */
  var _getResponseHeader    = XMLHttpRequest.prototype.getResponseHeader;
  var _getAllResponseHeaders = XMLHttpRequest.prototype.getAllResponseHeaders;

  XMLHttpRequest.prototype.getResponseHeader = function (name) {
    if (this._mockFn) {
      if (name.toLowerCase() === 'content-type') return 'application/json';
      return null;
    }
    return _getResponseHeader.apply(this, arguments);
  };

  XMLHttpRequest.prototype.getAllResponseHeaders = function () {
    if (this._mockFn) {
      return 'content-type: application/json\r\n';
    }
    return _getAllResponseHeaders.apply(this, arguments);
  };

  console.log('[Mock API] Interceptor ativo para api-contasy.com (delay: ' + DELAY + 'ms)');

  /* ── Logo override via MutationObserver ─────────────────── */
  var LOGO_SVG = '<a href="https://contasy.com.br" target="_self" class="brand-logo" style="display:inline-flex;align-items:center;">'
    + '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3208.4 995.8" xml:space="preserve" width="149.98" height="46.55">'
    + '<g transform="scale(10.419278872241968) translate(10, 10)">'
    + '<g id="SvgjsG1671" transform="matrix(4.139413588396474,0,0,4.139413588396474,-0.00009474365818168199,0)">'
    + '<g>'
    + '<path d="M1.1,0C-4,6.8,10.6,10.2,11.6,14.8C11.2,7.4-1.4,7.4,1.1,0z" style="fill:var(--primary);"></path>'
    + '<path d="M4.4,9.4c0.3,1.3,1,2.6,2.4,2.6c0.6,0,4.1,3.8,3.9,4.6c-0.4,1.6-2.2,0-2.1-1.7c-1.6,3,2.5,4.6,3.3,2.1C12.6,14.6,6.2,9.6,4.4,9.4L4.4,9.4z" style="fill:var(--primary);"></path>'
    + '<path d="M15.9,9.3c0,0.9-1.2,2.8-2.4,2.3c-0.2-0.1-1.5,1.6-1.6,1.1c0-0.2-0.1-0.6-0.2-0.8C11.5,11,15.7,9.2,15.9,9.3L15.9,9.3z" style="fill:var(--primary);"></path>'
    + '<path d="M10.2,9.8c0.2,0.2,0.6,0.6,0.8,0.8c0,0,11.6-3.4,7.1-10.5C20.4,7.7,9.2,8.3,10.2,9.8L10.2,9.8z" style="fill:var(--primary);"></path>'
    + '</g></g>'
    + '<g id="SvgjsG1672" transform="matrix(2.3938197851983785,0,0,2.3938197851983785,96.00772526850203,1.5251185358536183)">'
    + '<path d="M6.3,18.9c1.3,0,2.3-0.5,3-1.5c0.1-0.2,0.2-0.2,0.4-0.1l0.7,0.4c0.2,0.1,0.2,0.2,0.1,0.4c-0.9,1.3-2.4,2.1-4.2,2.1c-2.9,0-5.1-2.2-5.1-5.1S3.4,10,6.3,10c1.8,0,3.3,0.8,4.2,2.1c0.1,0.2,0.1,0.3-0.1,0.4l-0.7,0.4C9.6,13,9.4,13,9.3,12.8c-0.7-0.9-1.7-1.5-3-1.5c-2.1,0-3.6,1.5-3.6,3.7S4.2,18.9,6.3,18.9L6.3,18.9z M17.7,20.3c-2.9,0-5.1-2.2-5.1-5.1c0-2.9,2.3-5.1,5.1-5.1c2.9,0,5.1,2.3,5.1,5.1C22.8,18,20.5,20.3,17.7,20.3z M17.7,18.9c2.1,0,3.7-1.7,3.7-3.7c0-2.1-1.6-3.7-3.7-3.7c-2.1,0-3.7,1.7-3.7,3.7C14,17.2,15.6,18.9,17.7,18.9z M30.4,10c2.2,0,3.6,1.3,3.6,3.9v5.8c0,0.2-0.1,0.3-0.3,0.3h-0.9c-0.2,0-0.3-0.1-0.3-0.3V14c0-1.7-0.9-2.6-2.5-2.6c-2.2,0-3.3,1.9-3.3,2.3v6.1c0,0.2-0.1,0.3-0.3,0.3h-0.9c-0.2,0-0.3-0.1-0.3-0.3v-9.2c0-0.2,0.1-0.3,0.3-0.3h0.8c0.2,0,0.3,0.1,0.3,0.3l0.1,1.4h0.2C27.5,10.9,28.7,10,30.4,10L30.4,10z M46.1,18.5c0.1,0.1,0.1,0.3,0,0.4c-0.5,0.5-1.6,1.3-3.2,1.3c-1.9,0-3.8-0.8-3.8-3.9v-4.7h-2.6c-0.2,0-0.3-0.1-0.3-0.3v-0.7c0-0.2,0.1-0.3,0.3-0.3h2.6V7.6c0-0.2,0.1-0.3,0.3-0.3h0.9c0.2,0,0.3,0.1,0.3,0.3v2.6h4.3c0.2,0,0.3,0.1,0.3,0.3v0.7c0,0.2-0.1,0.3-0.3,0.3h-4.3v4.6c0,2.1,1.2,2.6,2.5,2.6c1.1,0,1.8-0.5,2.2-0.8c0.1-0.1,0.3-0.1,0.4,0L46.1,18.5z M57.6,18.8c0.2,0,0.3,0.1,0.3,0.4v0.6c0,0.2-0.1,0.3-0.5,0.4c-1.4,0.1-1.9-0.6-1.9-1.6c-1.3,1.3-3.1,1.7-4.5,1.7c-2.3,0-3.2-1.2-3.2-2.8s1-2.6,3.1-2.9l3.1-0.5c0.9-0.1,1.2-0.2,1.3-0.4v0c0-1.7-0.9-2.3-2.6-2.3c-1.5,0-2.7,0.4-2.8,1.7c0,0.2-0.1,0.2-0.3,0.2h-0.9c-0.2,0-0.3-0.1-0.3-0.3c0.2-2.2,1.9-2.9,4.3-2.9c2.9,0,4.1,1.4,4.1,3.5V18c0,0.4,0.2,0.7,0.7,0.8L57.6,18.8L57.6,18.8z M49.4,17.3c0,0.9,0.6,1.5,2,1.5c1.3,0,2.8-0.3,4-1.6v-2.5c-0.1,0.2-0.3,0.3-1,0.4l-3,0.4C49.8,15.9,49.4,16.5,49.4,17.3z M64.1,14.5c2.3,0.3,4.5,0.6,4.5,2.9c0,1.7-1.3,2.9-4.5,2.9c-2.5,0-4.3-0.7-4.5-2.9c0-0.2,0.1-0.3,0.3-0.3h0.9c0.2,0,0.3,0.1,0.3,0.2c0.2,1.2,1.4,1.7,3,1.7c1.9,0,3-0.5,3-1.6c0-1.2-1.2-1.4-3-1.7c-2.3-0.3-4.3-0.7-4.3-2.9c0-1.6,1.2-2.9,4.1-2.9c2.4,0,4.2,0.7,4.4,2.9c0,0.2-0.1,0.3-0.3,0.3h-0.9c-0.2,0-0.3-0.1-0.3-0.2c-0.2-1.2-1.4-1.7-2.9-1.7c-1.7,0-2.7,0.5-2.7,1.6C61.3,14,62.4,14.3,64.1,14.5L64.1,14.5z M79.9,10.2c0.2,0,0.3,0.1,0.2,0.3l-5.7,13c-0.1,0.2-0.2,0.2-0.4,0.2h-0.9c-0.2,0-0.3-0.1-0.2-0.3l1.5-3.5l-4.1-9.5c-0.1-0.2,0-0.3,0.2-0.3h0.9c0.2,0,0.3,0.1,0.4,0.2l3.4,7.9l3.4-7.9c0.1-0.2,0.2-0.2,0.4-0.2L79.9,10.2L79.9,10.2z" style="fill:var(--primary);"></path>'
    + '</g>'
    + '</g></svg></a>';

  function injectLogo() {
    var brandLogoSpan = document.querySelector('.navbar-brand .brand-logo');
    if (brandLogoSpan && !brandLogoSpan.dataset.logoInjected) {
      // Substitui o conteúdo (b-img) pelo SVG
      brandLogoSpan.innerHTML = LOGO_SVG;
      brandLogoSpan.dataset.logoInjected = '1';
    }
  }

  var _logoObserver = new MutationObserver(function () {
    injectLogo();
  });

  /* ── CSS shims: evita CSS_CHUNK_LOAD_FAILED para chunks ausentes ── */
  (function () {
    var missingCss = [
      '/css/chunk-0d36f369.d73247e7.css',
      '/css/chunk-cf639660.9b1e46c4.css',
      '/css/chunk-5b77a0d8.9b1e46c4.css',
      '/css/chunk-8e696c16.2119b9b7.css',
      '/css/chunk-a994ecf2.e03da3c8.css',
      '/css/chunk-7d76483f.d514bd62.css',
      '/css/chunk-665fac01.582154b3.css',
      '/css/chunk-1e1e2ade.f6fbe297.css',
      '/css/chunk-546837cd.4f19eb0b.css',
      '/css/chunk-3419fd6c.c82b503b.css'
    ];
    missingCss.forEach(function (href) {
      var el = document.createElement('link');
      el.rel = 'stylesheet';
      el.setAttribute('data-href', href);
      document.head.appendChild(el);
    });
  })();

  /* ── Chunks de rotas registrados via webpackJsonp (antes do app.js) ── */
  (function () {
    var wp = window['webpackJsonp'] = window['webpackJsonp'] || [];

    /* helper: badge de status */
    function badge(h, status) {
      var map = {
        paid:     { v: 'success',   l: 'Pago' },
        pending:  { v: 'warning',   l: 'Pendente' },
        overdue:  { v: 'danger',    l: 'Atrasado' },
        sent:     { v: 'info',      l: 'Enviado' },
        canceled: { v: 'secondary', l: 'Cancelado' }
      };
      var m = map[status] || { v: 'secondary', l: status };
      return h('b-badge', { attrs: { variant: m.v, pill: true } }, m.l);
    }

    /* helper: coluna de informação */
    function infoCol(h, label, value) {
      return h('div', { staticClass: 'col-12 col-md-6 mb-2' }, [
        h('div', { staticClass: 'text-muted small mb-25' }, label),
        h('div', { staticClass: 'font-weight-bold' }, value || '—')
      ]);
    }

    /* helper: card de estatística (padrão panel-resume) */
    function statCard(h, value, label, icon, variant) {
      return h('div', { staticClass: 'card mb-1' }, [
        h('div', { staticClass: 'card-body d-flex justify-content-between align-items-center' }, [
          h('div', { staticClass: 'truncate' }, [
            h('h4', { staticClass: 'mb-25 font-weight-bolder' }, value),
            h('span', label)
          ]),
          h('b-avatar', {
            attrs: { variant: variant, size: '45', rounded: '' }
          }, [h('feather-icon', { attrs: { icon: icon, size: '21' } })])
        ])
      ]);
    }

    /* ── LayoutFull (chunk-2d22bcc3 → "f102") */
    wp.push([['chunk-2d22bcc3'], {
      'f102': function (t, e) {
        e.__esModule = true;
        e.default = {
          name: 'LayoutFull',
          render: function (h) {
            return h('div', { staticClass: 'misc-wrapper' }, this.$slots.default || []);
          }
        };
      }
    }]);

    /* ── chunks compartilhados (sem entry point próprio) */
    wp.push([['chunk-d0a9a6f8'], {}]);
    wp.push([['chunk-8d89d014'], {}]);
    wp.push([['chunk-20680bbe'], {}]);

    /* ── /empresa/detalhes (chunk-0d36f369 → "8f8c") */
    wp.push([['chunk-0d36f369'], {
      '8f8c': function (t, e) {
        e.__esModule = true;
        e.default = {
          computed: {
            company: function () { return this.$store.state.authenticate.companySelected || {}; }
          },
          render: function (h) {
            var c = this.company;
            var regimeMap = { simples_nacional: 'Simples Nacional', lucro_presumido: 'Lucro Presumido', lucro_real: 'Lucro Real' };
            var regime = regimeMap[c.tax_regime] || c.tax_regime || '—';
            var openDate = c.opened_at ? c.opened_at.split('-').reverse().join('/') : '—';
            var guias = [
              { period: '03/2025', type: 'DAS', value: 'R$ 990,00',   due: '20/04/2025', status: 'paid' },
              { period: '04/2025', type: 'DAS', value: 'R$ 1.032,00', due: '20/05/2025', status: 'paid' },
              { period: '05/2025', type: 'DAS', value: 'R$ 1.110,00', due: '20/06/2025', status: 'pending' }
            ];
            return h('div', [
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, 'Simples Nacional', 'Regime tributário', 'BriefcaseIcon', 'light-primary')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, 'Ativo', 'Status da empresa', 'CheckCircleIcon', 'light-success')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, '1', 'Sócio(s)', 'UsersIcon', 'light-info')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, '5 anos', 'Tempo de abertura', 'CalendarIcon', 'light-warning')])
              ]),
              /* Main content row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-12 col-lg-8' }, [
                  h('div', { staticClass: 'card' }, [
                    h('div', { staticClass: 'card-header' }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('feather-icon', { attrs: { icon: 'BriefcaseIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                        h('h4', { staticClass: 'mb-0' }, 'Dados da empresa')
                      ])
                    ]),
                    h('div', { staticClass: 'card-body' }, [
                      h('div', { staticClass: 'row' }, [
                        infoCol(h, 'Razão Social', c.name || 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA'),
                        infoCol(h, 'CNPJ', '00.000.000/0001-00'),
                        infoCol(h, 'Regime Tributário', regime),
                        infoCol(h, 'Data de Abertura', openDate),
                        infoCol(h, 'CNAE Principal', '62.01-5-01 – Desenvolvimento de software'),
                        infoCol(h, 'E-mail Fiscal', 'fiscal@contasy.com.br'),
                        infoCol(h, 'Telefone', '(11) 99999-9999'),
                        infoCol(h, 'Sócio Administrador', 'Usuário Demo')
                      ])
                    ])
                  ])
                ]),
                h('div', { staticClass: 'col-12 col-lg-4' }, [
                  h('div', { staticClass: 'card' }, [
                    h('div', { staticClass: 'card-header' }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('feather-icon', { attrs: { icon: 'FileTextIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                        h('h4', { staticClass: 'mb-0' }, 'Guias recentes')
                      ])
                    ]),
                    h('ul', { staticClass: 'list-group list-group-flush' },
                      guias.map(function (g) {
                        return h('li', {
                          key: g.period,
                          staticClass: 'list-group-item d-flex justify-content-between align-items-center'
                        }, [
                          h('div', [
                            h('div', { staticClass: 'font-weight-bold' }, g.type + ' ' + g.period),
                            h('small', { staticClass: 'text-muted' }, 'Venc. ' + g.due)
                          ]),
                          h('div', { staticClass: 'text-right' }, [
                            h('div', { staticClass: 'font-weight-bold' }, g.value),
                            badge(h, g.status)
                          ])
                        ]);
                      })
                    )
                  ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /impostos (chunk-cf639660 → "d58f5") */
    wp.push([['chunk-cf639660'], {
      'd58f5': function (t, e) {
        e.__esModule = true;
        var taxItems = [
          { id: 1, period: '01/2025', type: 'DAS', due: '20/02/2025', amount: 'R$ 852,00',   status: 'paid' },
          { id: 2, period: '02/2025', type: 'DAS', due: '20/03/2025', amount: 'R$ 948,00',   status: 'paid' },
          { id: 3, period: '03/2025', type: 'DAS', due: '20/04/2025', amount: 'R$ 990,00',   status: 'paid' },
          { id: 4, period: '04/2025', type: 'DAS', due: '20/05/2025', amount: 'R$ 1.032,00', status: 'paid' },
          { id: 5, period: '05/2025', type: 'DAS', due: '20/06/2025', amount: 'R$ 1.110,00', status: 'pending' }
        ];
        e.default = {
          data: function () { return { items: taxItems }; },
          methods: {
            goDetail: function (id) { this.$router.push({ name: 'impostos/id', params: { id: String(id) } }); }
          },
          render: function (h) {
            var self = this;
            var paid = self.items.filter(function (x) { return x.status === 'paid'; });
            var pending = self.items.filter(function (x) { return x.status === 'pending'; });
            return h('div', [
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, String(paid.length), 'Impostos pagos', 'CheckCircleIcon', 'light-success')]),
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, String(pending.length), 'Pendentes', 'AlertCircleIcon', 'light-warning')]),
                h('div', { staticClass: 'col-12 col-md-4' }, [statCard(h, 'R$ 3.822,00', 'Total pago no período', 'DollarSignIcon', 'light-primary')])
              ]),
              /* List card */
              h('div', { staticClass: 'card' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center' }, [
                    h('feather-icon', { attrs: { icon: 'FileTextIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                    h('h4', { staticClass: 'mb-0' }, 'Histórico de impostos')
                  ])
                ]),
                h('ul', { staticClass: 'list-group list-group-flush' },
                  self.items.map(function (tx) {
                    return h('li', {
                      key: tx.id,
                      staticClass: 'list-group-item d-flex justify-content-between align-items-center',
                      style: { cursor: 'pointer' },
                      on: { click: function () { self.goDetail(tx.id); } }
                    }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('b-avatar', {
                          attrs: { variant: tx.status === 'paid' ? 'light-success' : 'light-warning', size: '38', rounded: '' },
                          staticClass: 'mr-1'
                        }, [h('feather-icon', { attrs: { icon: 'FileTextIcon', size: '16' } })]),
                        h('div', [
                          h('div', { staticClass: 'font-weight-bold' }, tx.type + ' – Competência ' + tx.period),
                          h('small', { staticClass: 'text-muted' }, 'Vencimento: ' + tx.due)
                        ])
                      ]),
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('span', { staticClass: 'font-weight-bold mr-75' }, tx.amount),
                        badge(h, tx.status)
                      ])
                    ]);
                  })
                )
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /declaracoes (chunk-5b77a0d8 → "bed4") */
    wp.push([['chunk-5b77a0d8'], {
      'bed4': function (t, e) {
        e.__esModule = true;
        var declItems = [
          { id: 1, period: '01/2025', type: 'DASN-Simei', due: '31/01/2025', sent: '15/01/2025', status: 'sent' },
          { id: 2, period: '01/2025', type: 'DEFIS',      due: '31/03/2025', sent: '10/03/2025', status: 'sent' },
          { id: 3, period: '12/2024', type: 'DeSTDA',     due: '20/01/2025', sent: '18/01/2025', status: 'sent' },
          { id: 4, period: '01/2025', type: 'DeSTDA',     due: '20/02/2025', sent: '19/02/2025', status: 'sent' },
          { id: 5, period: '02/2025', type: 'DeSTDA',     due: '20/03/2025', sent: null,         status: 'pending' }
        ];
        e.default = {
          data: function () { return { items: declItems }; },
          methods: {
            goDetail: function (id) { this.$router.push({ name: 'declaracoes/id', params: { id: String(id) } }); }
          },
          render: function (h) {
            var self = this;
            var sent = self.items.filter(function (x) { return x.status === 'sent'; });
            var pending = self.items.filter(function (x) { return x.status === 'pending'; });
            return h('div', [
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, String(sent.length), 'Declarações enviadas', 'SendIcon', 'light-success')]),
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, String(pending.length), 'Pendentes', 'ClockIcon', 'light-warning')]),
                h('div', { staticClass: 'col-12 col-md-4' }, [statCard(h, String(self.items.length), 'Total de declarações', 'CalendarIcon', 'light-primary')])
              ]),
              /* List card */
              h('div', { staticClass: 'card' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center' }, [
                    h('feather-icon', { attrs: { icon: 'CalendarIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                    h('h4', { staticClass: 'mb-0' }, 'Histórico de declarações')
                  ])
                ]),
                h('ul', { staticClass: 'list-group list-group-flush' },
                  self.items.map(function (d) {
                    return h('li', {
                      key: d.id,
                      staticClass: 'list-group-item d-flex justify-content-between align-items-center',
                      style: { cursor: 'pointer' },
                      on: { click: function () { self.goDetail(d.id); } }
                    }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('b-avatar', {
                          attrs: { variant: d.status === 'sent' ? 'light-success' : 'light-warning', size: '38', rounded: '' },
                          staticClass: 'mr-1'
                        }, [h('feather-icon', { attrs: { icon: 'CalendarIcon', size: '16' } })]),
                        h('div', [
                          h('div', { staticClass: 'font-weight-bold' }, d.type + ' – ' + d.period),
                          h('small', { staticClass: 'text-muted' }, d.sent ? 'Enviada em ' + d.sent : 'Prazo: ' + d.due)
                        ])
                      ]),
                      badge(h, d.status)
                    ]);
                  })
                )
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /assinaturas (chunk-8e696c16 → "6c5e") */
    wp.push([['chunk-8e696c16'], {
      '6c5e': function (t, e) {
        e.__esModule = true;
        e.default = {
          render: function (h) {
            var features = [
              'Contabilidade completa',
              'Emissão de guias DAS',
              'Declarações acessórias',
              'Suporte prioritário',
              'Certificado digital e-CPF',
              'Gestão de impostos'
            ];
            return h('div', [
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-12 col-md-6 offset-md-3' }, [
                  /* Status stat */
                  statCard(h, 'Ativa', 'Status da assinatura', 'CheckCircleIcon', 'light-success'),
                  /* Plan card */
                  h('div', { staticClass: 'card' }, [
                    h('div', { staticClass: 'card-header' }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('feather-icon', { attrs: { icon: 'CreditCardIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                        h('h4', { staticClass: 'mb-0' }, 'Minha assinatura')
                      ])
                    ]),
                    h('div', { staticClass: 'card-body' }, [
                      h('div', { staticClass: 'text-center py-1' }, [
                        h('h2', { staticClass: 'text-primary mb-25 font-weight-bolder' }, 'Plano Pro'),
                        h('p', { staticClass: 'text-muted mb-50' }, 'Acesso completo a todas as funcionalidades do Contasy'),
                        h('div', { staticClass: 'my-1' }, [
                          h('h3', { staticClass: 'font-weight-bolder' }, [
                            h('span', { staticClass: 'text-primary' }, 'R$ 149'),
                            h('small', { staticClass: 'text-muted font-weight-normal' }, '/mês')
                          ])
                        ]),
                        h('hr')
                      ]),
                      h('ul', { staticClass: 'list-group list-group-flush' },
                        features.map(function (f) {
                          return h('li', { staticClass: 'list-group-item d-flex align-items-center px-0' }, [
                            h('b-avatar', {
                              attrs: { variant: 'light-success', size: '24', rounded: '' },
                              staticClass: 'mr-1'
                            }, [h('feather-icon', { attrs: { icon: 'CheckIcon', size: '12' } })]),
                            h('span', f)
                          ]);
                        })
                      ),
                      h('hr'),
                      h('div', { staticClass: 'text-center mt-1' }, [
                        h('p', { staticClass: 'text-muted small mb-1' }, 'Próxima cobrança: 01/06/2025 · Renovação automática'),
                        h('b-button', { attrs: { variant: 'outline-primary', size: 'sm' } }, 'Gerenciar pagamento')
                      ])
                    ])
                  ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /perfil (chunk-a994ecf2 → "6617") */
    wp.push([['chunk-a994ecf2'], {
      '6617': function (t, e) {
        e.__esModule = true;
        e.default = {
          computed: {
            user: function () { return this.$store.state.authenticate.userInfo || {}; }
          },
          render: function (h) {
            var u = this.user;
            return h('div', [
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-12 col-md-8 offset-md-2' }, [
                  h('div', { staticClass: 'card' }, [
                    h('div', { staticClass: 'card-header' }, [
                      h('div', { staticClass: 'd-flex align-items-center' }, [
                        h('feather-icon', { attrs: { icon: 'UserIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                        h('h4', { staticClass: 'mb-0' }, 'Dados pessoais')
                      ])
                    ]),
                    h('div', { staticClass: 'card-body' }, [
                      h('div', { staticClass: 'text-center mb-2' }, [
                        h('b-avatar', {
                          attrs: { size: '90', variant: 'light-primary', text: (u.name || 'U').charAt(0), rounded: 'circle' }
                        }),
                        h('h5', { staticClass: 'mt-1 mb-25 font-weight-bolder' }, u.name || 'Usuário Demo'),
                        h('p', { staticClass: 'text-muted small mb-0' }, u.role === 0 ? 'Usuário' : 'Administrador')
                      ]),
                      h('hr'),
                      h('div', { staticClass: 'row' }, [
                        infoCol(h, 'Nome completo', u.name || 'Usuário Demo'),
                        infoCol(h, 'E-mail', u.email || 'demo@contasy.com'),
                        infoCol(h, 'CPF', '000.000.000-00'),
                        infoCol(h, 'Telefone', '(11) 99999-9999'),
                        infoCol(h, 'Data de nascimento', '01/01/1990'),
                        infoCol(h, 'Perfil', u.role === 0 ? 'Usuário' : 'Administrador')
                      ])
                    ])
                  ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /certificado-digital (chunk-7d76483f → "eb67") */
    wp.push([['chunk-7d76483f'], {
      'eb67': function (t, e) {
        e.__esModule = true;
        e.default = {
          render: function (h) {
            return h('div', [
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, 'e-CPF A1', 'Tipo do certificado', 'ServerIcon', 'light-primary')]),
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, '15/03/2026', 'Validade', 'CalendarIcon', 'light-success')]),
                h('div', { staticClass: 'col-12 col-md-4' }, [statCard(h, '306 dias', 'Dias restantes', 'ClockIcon', 'light-warning')])
              ]),
              /* Main card */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-12 col-md-8 offset-md-2' }, [
                  h('div', { staticClass: 'card' }, [
                    h('div', { staticClass: 'card-header' }, [
                      h('div', { staticClass: 'd-flex align-items-center justify-content-between w-100' }, [
                        h('div', { staticClass: 'd-flex align-items-center' }, [
                          h('feather-icon', { attrs: { icon: 'ServerIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                          h('h4', { staticClass: 'mb-0' }, 'Certificado Digital e-CPF')
                        ]),
                        h('b-badge', { attrs: { variant: 'light-success', pill: true } }, '✓  Válido')
                      ])
                    ]),
                    h('div', { staticClass: 'card-body' }, [
                      h('div', { staticClass: 'row' }, [
                        infoCol(h, 'Titular', 'Usuário Demo'),
                        infoCol(h, 'CPF', '000.000.000-00'),
                        infoCol(h, 'Tipo', 'e-CPF A1'),
                        infoCol(h, 'Autoridade Certificadora', 'Serasa AC'),
                        infoCol(h, 'Emitido em', '15/03/2023'),
                        infoCol(h, 'Validade', '15/03/2026')
                      ])
                    ])
                  ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /empresas (chunk-665fac01 → "6382") – layout: full */
    wp.push([['chunk-665fac01'], {
      '6382': function (t, e) {
        e.__esModule = true;
        e.default = {
          computed: {
            user:    function () { return this.$store.state.authenticate.userInfo || {}; },
            company: function () { return this.$store.state.authenticate.companySelected; }
          },
          methods: {
            select: function (company) {
              this.$store.commit('SET_COMPANY_SELECTED', company);
              localStorage.setItem('COMPANY_SELECTED', JSON.stringify(company));
              this.$router.push({ name: 'painel' });
            }
          },
          render: function (h) {
            var self = this;
            var companies = self.user.companies || [
              { id: 1, name: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA', opened_at: '2020-01-01' }
            ];
            return h('div', {
              staticClass: 'd-flex align-items-center justify-content-center',
              style: { minHeight: '100vh', background: '#f8f8f8', padding: '2rem' }
            }, [
              h('div', { style: { width: '100%', maxWidth: '480px' } }, [
                h('div', { staticClass: 'text-center mb-2' }, [
                  h('h3', { staticClass: 'font-weight-bolder' }, 'Selecionar empresa'),
                  h('p', { staticClass: 'text-muted' }, 'Escolha a empresa que deseja acessar')
                ]),
                h('div', {},
                  companies.map(function (co) {
                    var selected = self.company && self.company.id === co.id;
                    return h('div', {
                      key: co.id,
                      staticClass: 'card mb-1',
                      style: { cursor: 'pointer', border: selected ? '2px solid #fe3e6d' : '1px solid #ebe9f1' },
                      on: { click: function () { self.select(co); } }
                    }, [
                      h('div', { staticClass: 'card-body d-flex align-items-center justify-content-between' }, [
                        h('div', { staticClass: 'd-flex align-items-center' }, [
                          h('b-avatar', { attrs: { variant: 'light-primary', text: co.name.charAt(0), size: '48', rounded: '' }, staticClass: 'mr-1' }),
                          h('div', [
                            h('div', { staticClass: 'font-weight-bold' }, co.name),
                            h('small', { staticClass: 'text-muted' }, 'Abertura: ' + (co.opened_at || '').split('-').reverse().join('/'))
                          ])
                        ]),
                        selected
                          ? h('feather-icon', { attrs: { icon: 'CheckCircleIcon', size: '20' }, staticClass: 'text-primary' })
                          : h('feather-icon', { attrs: { icon: 'ChevronRightIcon', size: '20' }, staticClass: 'text-muted' })
                      ])
                    ]);
                  })
                )
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /parceiros (chunk-a924f88a → "1aa8") */
    wp.push([['chunk-a924f88a'], {
      '1aa8': function (t, e) {
        e.__esModule = true;
        var partners = [
          { name: 'Notasy',        desc: 'Emissão de notas fiscais integrada ao seu faturamento', icon: 'FileIcon',       variant: 'light-primary', url: 'https://notasy.com.br' },
          { name: 'Conta Simples', desc: 'Conta bancária PJ com múltiplos cartões de crédito',   icon: 'CreditCardIcon', variant: 'light-success', url: 'https://lp.contasimples.com/contasy' },
          { name: 'Appmax',        desc: 'Gateway de pagamentos com 98% de taxa de aprovação',   icon: 'TrendingUpIcon', variant: 'light-warning', url: 'https://appmax.com.br' },
          { name: 'Jusbrasil',     desc: 'Consulta jurídica e acompanhamento de processos',      icon: 'BookIcon',       variant: 'light-info',    url: 'https://jusbrasil.com.br' }
        ];
        e.default = {
          render: function (h) {
            return h('div', [
              /* Header card */
              h('div', { staticClass: 'card mb-1' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center' }, [
                    h('feather-icon', { attrs: { icon: 'StarIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                    h('h4', { staticClass: 'mb-0' }, 'Parceiros Contasy')
                  ])
                ]),
                h('div', { staticClass: 'card-body' }, [
                  h('p', { staticClass: 'text-muted mb-0' }, 'Benefícios exclusivos para clientes Contasy. Acesse as plataformas parceiras e aproveite as vantagens.')
                ])
              ]),
              /* Partner cards */
              h('div', { staticClass: 'row' }, partners.map(function (p) {
                  return h('div', { staticClass: 'col-12 col-md-6 mb-1', key: p.name }, [
                    h('div', { staticClass: 'card h-100' }, [
                      h('div', { staticClass: 'card-body d-flex align-items-start' }, [
                        h('b-avatar', {
                          attrs: { variant: p.variant, size: '54', rounded: '' },
                          staticClass: 'mr-1 flex-shrink-0'
                        }, [h('feather-icon', { attrs: { icon: p.icon, size: '22' } })]),
                        h('div', { staticClass: 'w-100' }, [
                          h('div', { staticClass: 'd-flex justify-content-between align-items-start mb-25' }, [
                            h('h5', { staticClass: 'mb-0 font-weight-bolder' }, p.name),
                            h('b-button', {
                              attrs: { variant: 'outline-primary', size: 'sm', href: p.url, target: '_blank' }
                            }, 'Acessar')
                          ]),
                          h('p', { staticClass: 'text-muted small mb-0' }, p.desc)
                        ])
                      ])
                    ])
                  ]);
                })
              )
            ]);
          }
        };
      }
    }]);

    /* ── /impostos/:id (chunk-1e1e2ade → "7110") */
    wp.push([['chunk-1e1e2ade'], {
      '7110': function (t, e) {
        e.__esModule = true;
        var taxData = {
          '1': { period: '01/2025', type: 'DAS', due: '20/02/2025', amount: 'R$ 852,00',   status: 'paid',    revenue: 'R$ 14.200,00', rate: '6,0%', faixa: '1ª Faixa' },
          '2': { period: '02/2025', type: 'DAS', due: '20/03/2025', amount: 'R$ 948,00',   status: 'paid',    revenue: 'R$ 15.800,00', rate: '6,0%', faixa: '1ª Faixa' },
          '3': { period: '03/2025', type: 'DAS', due: '20/04/2025', amount: 'R$ 990,00',   status: 'paid',    revenue: 'R$ 16.500,00', rate: '6,0%', faixa: '1ª Faixa' },
          '4': { period: '04/2025', type: 'DAS', due: '20/05/2025', amount: 'R$ 1.032,00', status: 'paid',    revenue: 'R$ 17.200,00', rate: '6,0%', faixa: '1ª Faixa' },
          '5': { period: '05/2025', type: 'DAS', due: '20/06/2025', amount: 'R$ 1.110,00', status: 'pending', revenue: 'R$ 18.500,00', rate: '6,0%', faixa: '1ª Faixa' }
        };
        e.default = {
          computed: {
            tax: function () { return taxData[this.$route.params.id] || taxData['1']; }
          },
          methods: {
            back: function () { this.$router.go(-1); }
          },
          render: function (h) {
            var tx = this.tax;
            var self = this;
            return h('div', [
              /* Back button */
              h('div', { staticClass: 'row mb-1' }, [
                h('div', { staticClass: 'col' }, [
                  h('b-button', {
                    attrs: { variant: 'flat-secondary', size: 'sm' },
                    on: { click: function () { self.back(); } }
                  }, [
                    h('feather-icon', { attrs: { icon: 'ArrowLeftIcon', size: '14' }, staticClass: 'mr-50' }),
                    'Voltar'
                  ])
                ])
              ]),
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, tx.amount, 'Valor do imposto', 'DollarSignIcon', 'light-primary')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, tx.revenue, 'Faturamento', 'TrendingUpIcon', 'light-info')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, tx.rate, 'Alíquota efetiva', 'PercentIcon', 'light-warning')]),
                h('div', { staticClass: 'col-6 col-md-3' }, [statCard(h, tx.due, 'Vencimento', 'CalendarIcon', tx.status === 'paid' ? 'light-success' : 'light-danger')])
              ]),
              /* Detail card */
              h('div', { staticClass: 'card' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center justify-content-between w-100' }, [
                    h('div', { staticClass: 'd-flex align-items-center' }, [
                      h('feather-icon', { attrs: { icon: 'FileTextIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                      h('h4', { staticClass: 'mb-0' }, 'Detalhes do imposto')
                    ]),
                    badge(h, tx.status)
                  ])
                ]),
                h('div', { staticClass: 'card-body' }, [
                  h('div', { staticClass: 'row' }, [
                    infoCol(h, 'Competência',           tx.period),
                    infoCol(h, 'Tipo',                  tx.type),
                    infoCol(h, 'Vencimento',             tx.due),
                    infoCol(h, 'Valor',                  tx.amount),
                    infoCol(h, 'Faturamento do período', tx.revenue),
                    infoCol(h, 'Alíquota efetiva',       tx.rate),
                    infoCol(h, 'Faixa Simples Nacional', tx.faixa)
                  ]),
                  tx.status === 'paid'
                    ? h('b-alert', { attrs: { show: true, variant: 'success' }, staticClass: 'mt-1' }, [
                        h('feather-icon', { attrs: { icon: 'CheckCircleIcon', size: '14' }, staticClass: 'mr-50' }),
                        ' Imposto pago e quitado.'
                      ])
                    : h('div', { staticClass: 'd-flex justify-content-end mt-1' }, [
                        h('b-button', { attrs: { variant: 'primary' } }, [
                          h('feather-icon', { attrs: { icon: 'DownloadIcon', size: '14' }, staticClass: 'mr-50' }),
                          'Baixar guia DAS'
                        ])
                      ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /declaracoes/:id (chunk-546837cd → "4f32") */
    wp.push([['chunk-546837cd'], {
      '4f32': function (t, e) {
        e.__esModule = true;
        var declData = {
          '1': { period: '01/2025', type: 'DASN-Simei', due: '31/01/2025', sent: '15/01/2025', status: 'sent',    protocol: 'DASN-2025-001234', obs: 'Declaração anual enviada com sucesso.' },
          '2': { period: '01/2025', type: 'DEFIS',      due: '31/03/2025', sent: '10/03/2025', status: 'sent',    protocol: 'DEFIS-2025-005678', obs: 'Declaração de informações socioeconômicas e fiscais.' },
          '3': { period: '12/2024', type: 'DeSTDA',     due: '20/01/2025', sent: '18/01/2025', status: 'sent',    protocol: 'DESTDA-2025-009012', obs: 'Declaração de substituição tributária.' },
          '4': { period: '01/2025', type: 'DeSTDA',     due: '20/02/2025', sent: '19/02/2025', status: 'sent',    protocol: 'DESTDA-2025-003456', obs: 'Declaração de substituição tributária.' },
          '5': { period: '02/2025', type: 'DeSTDA',     due: '20/03/2025', sent: null,         status: 'pending', protocol: null,                 obs: 'Aguardando envio pelo contador.' }
        };
        e.default = {
          computed: {
            decl: function () { return declData[this.$route.params.id] || declData['1']; }
          },
          methods: {
            back: function () { this.$router.go(-1); }
          },
          render: function (h) {
            var d = this.decl;
            var self = this;
            return h('div', [
              /* Back button */
              h('div', { staticClass: 'row mb-1' }, [
                h('div', { staticClass: 'col' }, [
                  h('b-button', {
                    attrs: { variant: 'flat-secondary', size: 'sm' },
                    on: { click: function () { self.back(); } }
                  }, [
                    h('feather-icon', { attrs: { icon: 'ArrowLeftIcon', size: '14' }, staticClass: 'mr-50' }),
                    'Voltar'
                  ])
                ])
              ]),
              /* Stat row */
              h('div', { staticClass: 'row' }, [
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, d.type, 'Tipo de declaração', 'CalendarIcon', 'light-primary')]),
                h('div', { staticClass: 'col-6 col-md-4' }, [statCard(h, d.sent || 'Pendente', 'Data de envio', 'SendIcon', d.status === 'sent' ? 'light-success' : 'light-warning')]),
                h('div', { staticClass: 'col-12 col-md-4' }, [statCard(h, d.due, 'Prazo de entrega', 'ClockIcon', 'light-info')])
              ]),
              /* Detail card */
              h('div', { staticClass: 'card' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center justify-content-between w-100' }, [
                    h('div', { staticClass: 'd-flex align-items-center' }, [
                      h('feather-icon', { attrs: { icon: 'CalendarIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                      h('h4', { staticClass: 'mb-0' }, 'Detalhes da declaração')
                    ]),
                    badge(h, d.status)
                  ])
                ]),
                h('div', { staticClass: 'card-body' }, [
                  h('div', { staticClass: 'row' }, [
                    infoCol(h, 'Período de apuração', d.period),
                    infoCol(h, 'Tipo',                d.type),
                    infoCol(h, 'Prazo de entrega',    d.due),
                    infoCol(h, 'Data de envio',       d.sent || '—'),
                    infoCol(h, 'Protocolo',            d.protocol || '—')
                  ]),
                  h('b-alert', {
                    attrs: { show: true, variant: d.status === 'sent' ? 'success' : 'warning' },
                    staticClass: 'mt-1'
                  }, d.obs)
                ])
              ])
            ]);
          }
        };
      }
    }]);

    /* ── /impostos/:id/declaracao (chunk-3419fd6c → "5bf0") */
    wp.push([['chunk-3419fd6c'], {
      '5bf0': function (t, e) {
        e.__esModule = true;
        e.default = {
          methods: {
            back: function () { this.$router.go(-1); }
          },
          render: function (h) {
            var self = this;
            return h('div', [
              /* Back button */
              h('div', { staticClass: 'row mb-1' }, [
                h('div', { staticClass: 'col' }, [
                  h('b-button', {
                    attrs: { variant: 'flat-secondary', size: 'sm' },
                    on: { click: function () { self.back(); } }
                  }, [
                    h('feather-icon', { attrs: { icon: 'ArrowLeftIcon', size: '14' }, staticClass: 'mr-50' }),
                    'Voltar'
                  ])
                ])
              ]),
              h('div', { staticClass: 'card' }, [
                h('div', { staticClass: 'card-header' }, [
                  h('div', { staticClass: 'd-flex align-items-center' }, [
                    h('feather-icon', { attrs: { icon: 'FileTextIcon', size: '18' }, staticClass: 'mr-75 text-primary' }),
                    h('h4', { staticClass: 'mb-0' }, 'Declaração de atividades')
                  ])
                ]),
                h('div', { staticClass: 'card-body' }, [
                  h('b-alert', { attrs: { show: true, variant: 'info' }, staticClass: 'mb-2' }, [
                    h('feather-icon', { attrs: { icon: 'InfoIcon', size: '14' }, staticClass: 'mr-50' }),
                    ' Preencha as informações referentes ao período de apuração.'
                  ]),
                  h('div', { staticClass: 'row' }, [
                    h('div', { staticClass: 'col-12 col-md-6 mb-1' }, [
                      h('label', { staticClass: 'font-weight-bold' }, 'Receita bruta do mês (R$)'),
                      h('b-form-input', { attrs: { placeholder: '0,00', type: 'number' } })
                    ]),
                    h('div', { staticClass: 'col-12 col-md-6 mb-1' }, [
                      h('label', { staticClass: 'font-weight-bold' }, 'Receita de exportação (R$)'),
                      h('b-form-input', { attrs: { placeholder: '0,00', type: 'number' } })
                    ])
                  ]),
                  h('div', { staticClass: 'd-flex justify-content-end mt-1' }, [
                    h('b-button', { attrs: { variant: 'primary' } }, [
                      h('feather-icon', { attrs: { icon: 'SendIcon', size: '14' }, staticClass: 'mr-50' }),
                      'Enviar declaração'
                    ])
                  ])
                ])
              ])
            ]);
          }
        };
      }
    }]);

  })();

  /* ── Menu item hover styles ─────────────────────────────── */
  (function () {
    var style = document.createElement('style');
    style.textContent = [
      '.main-menu .navigation li.nav-item > a,',
      '.main-menu .navigation li.nav-item ul li > a {',
      '  transition: background 150ms ease, color 150ms ease !important;',
      '}',
      '.main-menu .navigation li.nav-item:not(.active) > a:hover,',
      '.main-menu .navigation li.nav-item:not(.active).hover > a {',
      '  background: rgba(254, 62, 109, 0.12) !important;',
      '  color: #fe3e6d !important;',
      '  border-radius: 4px;',
      '}',
      '.main-menu .navigation li.nav-item ul li:not(.active) > a:hover,',
      '.main-menu .navigation li.nav-item ul li:not(.active).hover > a {',
      '  background: rgba(254, 62, 109, 0.12) !important;',
      '  color: #fe3e6d !important;',
      '  border-radius: 4px;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  })();

  document.addEventListener('DOMContentLoaded', function () {
    injectLogo();
    _logoObserver.observe(document.body, { childList: true, subtree: true });
    // Para de observar após 10s para não desperdiçar recursos
    setTimeout(function () { _logoObserver.disconnect(); }, 10000);
  });
})();
