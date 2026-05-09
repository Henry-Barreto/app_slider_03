import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
