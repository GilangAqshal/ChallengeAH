import 'package:intl/intl.dart';

/// Format tanggal untuk penyimpanan lokal dan kompatibilitas skema backend.
String dateKey(DateTime d) => DateFormat('yyyy-MM-dd').format(d);
