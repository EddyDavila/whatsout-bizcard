import 'dart:io';
import 'package:qr/qr.dart';

const targets = <String, String>{
  'qr-free.svg': 'https://whatsout-fcc29.web.app/',
  'qr-user-plus.svg': 'https://eddydavila.github.io/whatsout-bizcard/benefits/user-plus/',
  'qr-business-owner.svg': 'https://eddydavila.github.io/whatsout-bizcard/benefits/business-owner/',
};

String svgFor(String value) {
  final code = QrCode.fromData(data: value, errorCorrectLevel: QrErrorCorrectLevel.M);
  final image = QrImage(code);
  const quiet = 4;
  final size = image.moduleCount + quiet * 2;
  final out = StringBuffer()
    ..writeln('<?xml version="1.0" encoding="UTF-8"?>')
    ..writeln('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $size $size" shape-rendering="crispEdges" role="img" aria-label="QR code">')
    ..writeln('<rect width="$size" height="$size" fill="#ffffff"/>')
    ..write('<path fill="#050718" d="');
  for (var row = 0; row < image.moduleCount; row++) {
    for (var col = 0; col < image.moduleCount; col++) {
      if (image.isDark(row, col)) out.write('M${col + quiet} ${row + quiet}h1v1h-1z');
    }
  }
  return (out..writeln('"/>')..writeln('</svg>')).toString();
}

void main() {
  final scriptDir = File(Platform.script.toFilePath()).parent;
  final assets = Directory('${scriptDir.parent.path}${Platform.pathSeparator}assets')..createSync(recursive: true);
  for (final target in targets.entries) {
    File('${assets.path}${Platform.pathSeparator}${target.key}').writeAsStringSync(svgFor(target.value));
    stdout.writeln('${target.key}: ${target.value}');
  }
}
