#FROM bcgovimages/aries-cloudagent:py36-1.16-0_0.7-pre.0

FROM bcgovimages/von-image:py36-1.15-1

RUN pip3 install git+https://github.com/hyperledger/aries-cloudagent-python@main

RUN pip3 install git+https://github.com/sicpa-dlab/acapy-resolver-universal.git

ENTRYPOINT ["/bin/bash", "-c", "aca-py \"$@\"", "--"]