import React from 'react';
import { Button, Platform, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

import styles from '../styles/styles';

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

export { QUESTIONS, COURSES };

export default function Content({
  name,
  setName,
  course,
  setCourse,
  answers,
  setAnswers,
  onViewResult,
}) {
  return (
    <>
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
              <Text style={styles.valueText}>{value == null ? '—' : value}</Text>
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
        <Button title="Ver resultado" onPress={onViewResult} />
      </View>
    </>
  );
}
