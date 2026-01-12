from .models import Job   # adjust app name if different
from django.contrib.auth.models import User

user = User.objects.get(username="daniel")   # or create one if not exists

Job.objects.create(
    title="Frontend Engineer",
    description="Build responsive UIs with React, Next.js, and Tailwind",
    company="PixelCraft",
    location="Chennai",
    salary_range="6-10 LPA",
    created_by=user
)

Job.objects.create(
    title="DevOps Engineer",
    description="Manage CI/CD pipelines, Docker, Kubernetes, and cloud deployments",
    company="CloudSphere",
    location="Pune",
    salary_range="12-16 LPA",
    created_by=user
)

Job.objects.create(
    title="Mobile App Developer",
    description="Develop cross-platform apps using Flutter and Dart",
    company="Appify",
    location="Mumbai",
    salary_range="7-11 LPA",
    created_by=user
)

Job.objects.create(
    title="Data Scientist",
    description="Work on ML models, data pipelines, and analytics dashboards",
    company="InsightAI",
    location="Delhi",
    salary_range="15-20 LPA",
    created_by=user
)

Job.objects.create(
    title="UI/UX Designer",
    description="Design intuitive interfaces and improve user experience",
    company="DesignHub",
    location="Kolkata",
    salary_range="5-8 LPA",
    created_by=user
)

Job.objects.create(
    title="Cybersecurity Analyst",
    description="Monitor systems, detect threats, and implement security protocols",
    company="SecureNet",
    location="Bangalore",
    salary_range="10-14 LPA",
    created_by=user
)