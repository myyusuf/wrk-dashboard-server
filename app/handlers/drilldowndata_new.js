var flow = require('nimble');

var NetProfitResult = require('./netprofit_result');

exports.kontrakDihadapi = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: _month,
    year: _year,
    jsonData: {}
  }

  var query = "SELECT * FROM tb_net_profit WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;
      if(rows.length>0){
        _result.jsonData = JSON.parse(rows[0].data);
      }else{
        _result.jsonData = NetProfitResult.netProfitResult;
      }
      res.json(_result);

    }
  );

};

exports.projectInfoDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_info_proyek WHERE  tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      for (var _i in rows) {
        var _row = rows[_i];
        _result.push(JSON.parse(_row.data_proyek).infoProyek);
      }

      res.json(_result);

    }
  );
};

exports.projectInfoDDDetails = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_info_proyek WHERE id_proyek=? and tahun=? and bulan=?";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data_proyek).infoProyek;
      }

      res.json(_result);

    }
  );
};

exports.qmslDD = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_qmsl WHERE  id_proyek=? AND tahun=? AND bulan=? ";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).qmsl;
      }

      res.json(_result);

    }
  );
};

exports.sheLevelDD = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_she_level WHERE id_proyek=? AND tahun=? AND bulan=? ";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).sheLevel;
      }

      res.json(_result);

    }
  );
};

exports.limaRDD = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_lima_r WHERE id_proyek=? AND tahun=? AND bulan=? ";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).limaR;
      }

      res.json(_result);

    }
  );
};

exports.scoreCardDD = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_score_card WHERE id_proyek=? and tahun=? and bulan=?";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).scoreCard;

        if("WGPUS001" === _projectId){
          if(_month == 12){
            _month = 1
            _year = _year - 1
          }else{
            _month = _month - 1;
          }

          //------------------------------
          var query = "SELECT * FROM db_mobile_score_card WHERE id_proyek=? and tahun=? and bulan=?";
          db.query(
            query, [_projectId, _year, _month],
            function(err, rows) {
              if (err) throw err;

              var _prevScoreCard = {};

              if (rows.length > 0) {
                var _row = rows[0];
                _prevScoreCard = JSON.parse(_row.data).scoreCard;
                _result.kinerjaProdukProses.inovasi.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.inovasi.score.ri;
                _result.kinerjaProdukProses.qsheExcel.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.qsheExcel.score.ri;
                _result.kinerjaProdukProses.competitiveIndex.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.competitiveIndex.score.ri;

                _result.kinerjaFokusPelanggan.csi.score['prevRi'] = _prevScoreCard.kinerjaFokusPelanggan.csi.score.ri;

                _result.kinerjaKeuanganPasar.netProfit.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.netProfit.score.ri;
                _result.kinerjaKeuanganPasar.arusKasOperasi.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.arusKasOperasi.score.ri;
                _result.kinerjaKeuanganPasar.okBaru.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.okBaru.score.ri;
                _result.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score.ri;

                _result.kinerjaFokusTenagaKerja.hcEngagementLevel.score['prevRi'] = _prevScoreCard.kinerjaFokusTenagaKerja.hcEngagementLevel.score.ri;

                _result.kinerjaKepemimpinanTataKelola.gcgLevel.score['prevRi'] = _prevScoreCard.kinerjaKepemimpinanTataKelola.gcgLevel.score.ri;
                _result.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score['prevRi'] = _prevScoreCard.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score.ri;
              }else{
                _result.kinerjaProdukProses.inovasi.score['prevRi'] = 0;
                _result.kinerjaProdukProses.qsheExcel.score['prevRi'] = 0
                _result.kinerjaProdukProses.competitiveIndex.score['prevRi'] = 0;

                _result.kinerjaFokusPelanggan.csi.score['prevRi'] = 0;

                _result.kinerjaKeuanganPasar.netProfit.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.arusKasOperasi.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.okBaru.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score['prevRi'] = 0;

                _result.kinerjaFokusTenagaKerja.hcEngagementLevel.score['prevRi'] = 0;

                _result.kinerjaKepemimpinanTataKelola.gcgLevel.score['prevRi'] = 0;
                _result.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score['prevRi'] = 0;
              }

              res.json(_result);

            }
          );
          //------------------------------

        }else{
          res.json(_result);
        }
      }else{
        res.json(_result);
      }

    }
  );
};

exports.propertyDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_ok_op_lk_property WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).okOpLkProperty;
      }

      res.json(_result);

    }
  );
};
