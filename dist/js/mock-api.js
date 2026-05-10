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
    + '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3208.4 995.8" xml:space="preserve" width="150" height="46">'
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

  document.addEventListener('DOMContentLoaded', function () {
    injectLogo();
    _logoObserver.observe(document.body, { childList: true, subtree: true });
    // Para de observar após 10s para não desperdiçar recursos
    setTimeout(function () { _logoObserver.disconnect(); }, 10000);
  });
})();
