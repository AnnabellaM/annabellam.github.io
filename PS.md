I am a third-year Ph.D. student in Software Engineering at the University of Texas at Dallas, supervised by Dr. Shiyi Wei. My research interest lies in program analysis and fuzz testing with the goal of enhancing the tools’ reliability and improving the explainability of their evaluation. My work has applied diverse techniques from empirical studies to novel testing approaches and evaluation methodologies, with two main thrusts:

1. Improving the Reliability of Static Analysis Tools.
Nondeterministic Behavior in Static Analysis Tools. Despite being built on deterministic algorithms,
static analysis tools may exhibit nondeterministic behavior due to implementation choices. To investigate
this problem, we performed the first systematic empirical study of nondeterminism in static analysis tools.
We evaluated 12 widely-used tools using two complementary approaches: a qualitative analysis through
mining the software repositories to understand the extent to which tool users and maintainers are aware
of nondeterminism, and a quantitative evaluation that ran each tool multiple times across diverse input
programs and configurations to detect nondeterministic behavior. 

2. Novel Evaluation Methodologies of Fuzz Testing.
Program Feature-based Benchmarking. Our novel approach offers fine-grained configurable
parameters to control the construction of benchmark programs that represent specific features related to
the program’s control-flow and data-flow complexity. Evaluating fuzzers on such a set of programs can
offer deeper insights into how their performance varies on different program features and offer a
comparison of fuzzing performance across various configurations of the same program feature. This also
enables the validation of design choices in fuzzing algorithms, complementing existing fuzzing
benchmarks such as Google’s FuzzBench. 
Fuzzing Internal Visualization. We propose a taxonomy of visualization analysis tasks as the first step
towards the development of a fuzzing-specific visualization framework. Our approach involves conducting
interviews with fuzzing experts and using qualitative data analysis to systematically extract the task
taxonomy from the interview data. This taxonomy serves as a critical foundation for building
user-centered visualization tools, evaluating existing ones, and shifting the focus of fuzzing evaluation
beyond traditional metrics toward understanding how the internal fuzzing improvements work.

I am currently working on fuzzing bottleneck identification to identify fuzzing bottlenecks using criteria
that incorporate critical information from fuzzing campaigns and to collect the bottlenecks’ fine-grained
characteristics through control- and data-flow analyses. This will help researchers and practitioners
better understand the factors contributing to fuzzing inefficiencies and ultimately improve fuzzing strategies.

An internship at MPI-SP would offer a unique opportunity to collaborate with world-class researchers advancing the foundations and practice of large-scale software testing. I am particularly inspired by the Software Security Group’s work led by Dr. Marcel Böhme at the Max Planck Institute for Security and Privacy (MPI-SP). Their research on automated testing and analysis of software systems aligns closely with my interests in program analysis and fuzz testing. The collaborative environment at MPI-SP would provide an excellent platform for me to enhance my research skills, exchange ideas with leading experts, and contribute to impactful advancements in software security and reliability.