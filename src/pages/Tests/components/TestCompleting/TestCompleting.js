import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Config from 'config/colors';
import Notification from 'notification';
import RadioButton from 'components/RadioButton';
import { getTestResultStatus } from 'pages/Tests/selectors/tests.selectors';
import { createTestResultStart } from 'pages/Tests/actions/tests.actions';
import { isLoading } from 'utils/isLoading';
import Device from 'device';
import Loader from 'components/Loader';

const TestCompleting = ({ route, navigation, createTestResult, status }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({});
  const { test } = route.params;
  const hasNext = test.questions.length > step;
  const activeQuestion = test.questions[step - 1];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={isSubmitted ? handlePop : handleGoBack}>
          <MaterialCommunityIcons name="close" size={25} color={Config.white} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePop = () => {
    navigation.popToTop();
    const androidDetails = {
      date: new Date(Date.now()),
      allowWhileIdle: true,
      message: `You got ${sum + '/' + maxSum} points.`,
      channelId: 'notification-channel',
    };
    const iosDetails = {
      id: 'local',
      body: `You got ${sum + '/' + maxSum} points.`,
    };
    console.log(Device.isAndroid);
    Notification.showNotification({
      title: `Congratulations! You passed "${test.name}".`,
      ...(Device.isAndroid ? androidDetails : iosDetails),
    });
  };

  const handlePress = () => {
    if (!values[activeQuestion._id]) {
      Alert.alert('Please, select answer.');
      return;
    }
    if (hasNext) {
      setStep(step + 1);
      return;
    }
    handleFinish();
  };

  const handlePressPrev = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    createTestResult({
      mark: sum,
      testId: test._id,
      answers: yourAnswers.map((item) => item.answerId),
    });
    setIsSubmitted(true);
  };

  const handleSelect = (id) => {
    if (values[activeQuestion._id] !== id) {
      setValues((prevValues) => ({
        ...prevValues,
        [activeQuestion._id]: id,
      }));
    }
  };

  const yourAnswers = Object.keys(values).map((key) => {
    const question = test.questions.find((question) => question._id === key);
    const answer = question.answers.find(
      (answer) => answer._id === values[key],
    );
    const mark = answer.isCorrect ? question.mark : 0;
    return {
      questionText: question.text,
      answerText: answer.text,
      answerId: answer._id,
      mark,
    };
  });

  const sum = yourAnswers.reduce((a, c) => a + c.mark, 0);
  const maxSum = test.questions.reduce((a, c) => a + c.mark, 0);

  const percent = (sum * 100) / maxSum;

  return isLoading(status) ? (
    <View style={styles.fullHeight}>
      <Loader />
    </View>
  ) : !isSubmitted ? (
    <View style={styles.wrapper}>
      <View style={styles.stepWrapper}>
        <Text style={styles.step}>
          {step}/{test.questions.length}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{activeQuestion.text}</Text>
        <View style={styles.radioButtonsWrapper}>
          {activeQuestion.answers.map((answer) => (
            <RadioButton
              key={answer._id}
              title={answer.text}
              selected={values[activeQuestion._id] === answer._id}
              onPress={() => handleSelect(answer._id)}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        {step !== 1 && (
          <TouchableOpacity
            onPress={handlePressPrev}
            style={[styles.button, styles.buttonPrev]}>
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.button, step !== 1 && styles.buttonNext]}>
          <Text style={styles.buttonText}>{hasNext ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ScrollView>
      <View style={[styles.info, styles.withoutSpace]}>
        <Text style={styles.title}>{activeQuestion.text}</Text>
        <Text style={styles.yourAnswers}>Your answers:</Text>
        {yourAnswers.map((item) => (
          <View
            key={`${item.questionText} ${item.answerText}`}
            style={styles.flex}>
            <View style={styles.flexInner}>
              <Text style={styles.text}>{item.questionText}</Text>
              <Text style={styles.subtitle}>{item.answerText}</Text>
            </View>
            <MaterialCommunityIcons
              name={item.mark ? 'check' : 'close'}
              size={25}
              color={item.mark ? Config.success : Config.error}
            />
          </View>
        ))}
        <View
          style={[
            styles.totalScoreWrapper,
            {
              backgroundColor:
                percent < 50
                  ? Config.error
                  : percent < 75
                  ? Config.warning
                  : Config.success,
            },
          ]}>
          <Text style={styles.totalScore}>
            {sum}/{maxSum}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullHeight: {
    height: '100%',
  },
  stepWrapper: {
    backgroundColor: Config.primary,
    borderRadius: 50,
    position: 'absolute',
    right: 20,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  step: {
    fontSize: 16,
    color: Config.white,
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPrev: {
    marginHorizontal: 10,
    width: '45%',
  },
  buttonNext: {
    marginHorizontal: 10,
    width: '45%',
  },
  flexInner: {
    flexBasis: '90%',
  },
  yourAnswers: {
    fontSize: 20,
    marginVertical: 10,
  },
  subtitle: {
    marginLeft: 10,
    fontSize: 18,
  },
  withoutSpace: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: Config.darkGray,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  totalScoreWrapper: {
    width: 70,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  totalScore: {
    fontSize: 16,
    color: Config.white,
    textAlign: 'center',
  },
  radioButtonsWrapper: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  info: {
    flex: 1,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  button: {
    width: '90%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Config.primary,
  },
  buttonText: {
    color: Config.white,
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  status: getTestResultStatus(state),
});

const mapDispatchToProps = {
  createTestResult: createTestResultStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCompleting);
