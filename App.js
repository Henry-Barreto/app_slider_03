import React, { useMemo, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import Head from './src/components/Head';
import Content from './src/components/Content';
import Footer from './src/components/Footer';
import { QUESTIONS } from './src/components/Content';
import styles from './src/styles/styles';

function computeResult(answers) {
  const validAnswers = answers.map((v) => (typeof v === 'number' ? v : 0));
  const total = validAnswers.reduce((acc, v) => acc + v, 0);
  const average = total / QUESTIONS.length;

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
  const [answers, setAnswers] = useState(
    Array.from({ length: QUESTIONS.length }, () => null),
  );

  const allAnswered = answers.every((v) => typeof v === 'number');

  const computed = useMemo(() => {
    if (!allAnswered) return null;
    const { total, average, interpretation } = computeResult(answers);
    return {
      name: name.trim(),
      course,
      total,
      average,
      interpretation,
    };
  }, [answers, allAnswered, name, course]);

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
      Alert.alert(
        'Perguntas incompletas',
        'Responda todas as 10 perguntas antes de ver o resultado.',
      );
      return;
    }
    setShowResult(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Head />

      <Content
        name={name}
        setName={setName}
        course={course}
        setCourse={setCourse}
        answers={answers}
        setAnswers={setAnswers}
        onViewResult={handleViewResult}
      />

      <Footer showResult={showResult} result={computed} answers={answers} />
    </ScrollView>
  );
}
