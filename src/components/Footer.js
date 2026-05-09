import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles/styles';
import { QUESTIONS } from './Content';

export default function Footer({ showResult, result, answers }) {
  if (!showResult || !result) return null;

  return (
    <View style={[styles.section, styles.resultBox]}>
      <Text style={styles.resultTitle}>Resultado</Text>

      <Text style={styles.resultLine}>
        Participante: <Text style={styles.bold}>{result.name}</Text>
      </Text>
      <Text style={styles.resultLine}>
        Curso: <Text style={styles.bold}>{result.course}</Text>
      </Text>

      <View style={styles.hr} />

      <Text style={styles.resultLine}>
        Total: <Text style={styles.bold}>{result.total}</Text>
      </Text>
      <Text style={styles.resultLine}>
        Média: <Text style={styles.bold}>{result.average.toFixed(2)}</Text>
      </Text>
      <Text style={styles.resultLine}>
        Interpretação: <Text style={styles.bold}>{result.interpretation}</Text>
      </Text>

      <View style={styles.hr} />

      <Text style={styles.subtitleSmall}>Pontuação por pergunta</Text>
      {QUESTIONS.map((q, idx) => (
        <Text key={q} style={styles.answerLine}>
          {idx + 1}. {answers[idx]} / 5
        </Text>
      ))}
    </View>
  );
}
