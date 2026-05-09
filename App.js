import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

const LIKERT_MIN = 1;
const LIKERT_MAX = 5;
const LIKERT_STEP = 1;

const COURSES = [
  'Engenharia de Software',
  'Administração',
  'Direito',
  'Medicina',
  'Psicologia',
];

const QUESTIONS = [
  'Em geral, estou satisfeito(a) com meu aprendizado.',
  'Sinto que os conteúdos foram apresentados de forma clara.',
  'A metodologia utilizada foi adequada para meu aprendizado.',
  'Os materiais e recursos de apoio ajudaram a compreender o conteúdo.',
  'As atividades propostas foram coerentes com os objetivos.',
  'Tive oportunidade de participar e tirar dúvidas durante o processo.',
  'O ritmo do curso foi compatível com meu entendimento.',
  'O curso contribuiu para meu desenvolvimento e desempenho.',
  'Eu recomendaria este curso para outras pessoas.',
  'Estou satisfeito(a) com os resultados obtidos.',
];

function computeResult(answers) {
  const validAnswers = answers.map((v) => (typeof v === 'number' ? v : 0));
  const total = validAnswers.reduce((acc, v) => acc + v, 0);
  const average = total / QUESTIONS.length;

  // Interpretação simples por média (1..5)
  let interpretation = '';
  if (average < 2) interpretation = 'Insatisfatório';
  else if (average < 3) interpretation = 'Neutro';
  else if (average < 4) interpretation = 'Bom';
  else interpretation = 'Excelente';

  return { total, average, interpretation };
}

export default function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  // null => não respondida
  const [answers, setAnswers] = useState(Array.from({ length: QUESTIONS.length }, () => null));

  const allAnswered = answers.every((v) => typeof v === 'number');

  const result = useMemo(() => {
    if (!allAnswered) return null;
    return computeResult(answers);
  }, [answers, allAnswered]);

  const [showResult, setShowResult] = useState(false);

  function handleViewResult() {
    if (!name.trim()) {
      Alert.alert('Dados faltando', 'Informe seu nome.');
      return;
    }
    if (!course) {
      Alert.alert('Dados faltando', 'Selecione seu curso.');
      return;
    }
    if (!allAnswered) {
      Alert.alert('Perguntas incompletas', 'Responda todas as 10 perguntas antes de ver o resultado.');
      return;
    }
    setShowResult(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Questionário</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Curso</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={course}
            onValueChange={(value) => setCourse(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            {COURSES.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Responda as 10 perguntas (Likert 1–5)</Text>
      </View>

      {QUESTIONS.map((q, idx) => {
        const value = answers[idx];
        return (
          <View key={q} style={styles.questionBlock}>
            <Text style={styles.questionText}>
              {idx + 1}. {q}
            </Text>

            <View style={styles.scaleRow}>
              <Text style={styles.scaleText}>1</Text>
              <Text style={styles.valueText}>
                {value == null ? '—' : value}
              </Text>
              <Text style={styles.scaleText}>5</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={LIKERT_MIN}
              maximumValue={LIKERT_MAX}
              step={LIKERT_STEP}
              value={value == null ? LIKERT_MIN : value}
              onValueChange={(v) => {
                const intV = Math.round(v);
                setAnswers((prev) => {
                  const next = [...prev];
                  next[idx] = intV;
                  return next;
                });
              }}
              minimumTrackTintColor="#4f8cff"
              maximumTrackTintColor="#d9d9d9"
              thumbTintColor={Platform.OS === 'android' ? '#2f66ff' : '#2f66ff'}
            />
          </View>
        );
      })}

      <View style={styles.buttonRow}>
        <Button title="Ver resultado" onPress={handleViewResult} />
      </View>

      {showResult && result && (
        <View style={[styles.section, styles.resultBox]}>
          <Text style={styles.resultTitle}>Resultado</Text>
          <Text style={styles.resultLine}>
            Participante: <Text style={styles.bold}>{name.trim()}</Text>
          </Text>
          <Text style={styles.resultLine}>
            Curso: <Text style={styles.bold}>{course}</Text>
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
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitleSmall: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 6,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  picker: {
    height: 48,
    width: '100%',
  },
  questionBlock: {
    marginBottom: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#fbfbfb',
  },
  questionText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  scaleText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
  },
  valueText: {
    color: '#2f66ff',
    fontSize: 14,
    fontWeight: '800',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonRow: {
    marginVertical: 12,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#dbe7ff',
    backgroundColor: '#f3f7ff',
    padding: 16,
    borderRadius: 14,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  resultLine: {
    fontSize: 14,
    marginBottom: 4,
  },
  answerLine: {
    fontSize: 13,
    marginTop: 3,
    color: '#333',
  },
  bold: {
    fontWeight: '900',
  },
  hr: {
    height: 1,
    backgroundColor: '#d7d7d7',
    marginVertical: 10,
  },
});
